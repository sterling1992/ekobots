-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pages table for editable content
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  meta JSONB DEFAULT '{}',
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create assets table for image management
CREATE TABLE public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  color TEXT,
  image_id UUID REFERENCES public.assets(id),
  long_content JSONB DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create statistics table
CREATE TABLE public.statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create settings table
CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id UUID,
  before_data JSONB,
  after_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for site assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets',
  'site-assets',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_statistics_updated_at BEFORE UPDATE ON public.statistics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for pages (public read, admin/editor write)
CREATE POLICY "Anyone can view pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Editors can update pages" ON public.pages FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for assets
CREATE POLICY "Anyone can view assets" ON public.assets FOR SELECT USING (true);
CREATE POLICY "Admins and editors can upload assets" ON public.assets FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Admins can delete assets" ON public.assets FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for programs
CREATE POLICY "Anyone can view active programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Admins can manage programs" ON public.programs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Editors can update programs" ON public.programs FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for statistics
CREATE POLICY "Anyone can view visible statistics" ON public.statistics FOR SELECT USING (true);
CREATE POLICY "Admins can manage statistics" ON public.statistics FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Editors can update statistics" ON public.statistics FOR UPDATE
  USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for settings
CREATE POLICY "Anyone can view settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.settings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for audit_logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- Storage policies for site-assets bucket
CREATE POLICY "Public can view assets" ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated users can upload assets" ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'site-assets' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admins can delete assets" ON storage.objects FOR DELETE
  USING (
    bucket_id = 'site-assets' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Insert initial seed data for pages
INSERT INTO public.pages (slug, title, content) VALUES
('home', 'Página Principal', '{
  "hero": {
    "programLabel": "Programa",
    "title": "Eko Stem",
    "subtitle": "Jóvenes del Pacífico Caucano liderando la innovación con equidad y raíz territorial.",
    "ctaText": "Cursos presenciales",
    "durationText": "4 meses / 12 hrs semanales",
    "locations": ["Timbiquí", "Guapi"],
    "hashtag": "# Hagamos EKO JUNTOS"
  },
  "topbar": {
    "email": "info@ekobots.org",
    "phone": "+57 3116072750",
    "social": {
      "instagram": "https://www.instagram.com/ekobots?igsh=MWR4b2R4MGtwNTR3dw==",
      "facebook": "https://www.facebook.com/profile.php?id=100083510792987",
      "linkedin": ""
    }
  }
}'),
('nosotros', 'Nosotros', '{
  "title": "Nosotros",
  "leadText": "Cerramos brechas existentes en el Pacífico Caucano en temas de acceso y permanencia en la educación superior.",
  "description": "Fortalecemos habilidades de pensamiento computacional, algorítmico y diferentes habilidades del siglo XXI a niños, niñas y jóvenes. A través de cursos de formación presenciales no formales en STEM.",
  "badgeText": "Science, Technology, Engineering and Mathematics.",
  "quote": "Transformamos vidas, inspiramos mentes"
}'),
('impact', 'Impacto', '{
  "title": "Impacto",
  "subtitle": "Impactamos vidas con STEM",
  "description": "Educación, innovación y oportunidades para jóvenes del Pacífico caucano.",
  "since": "Desde 2018"
}'),
('donate', 'Donar', '{
  "leadText": "Tu apoyo cambia vidas",
  "title": "Súmate a transformar el futuro",
  "buttonText": "DONAR"
}');

-- Insert initial statistics
INSERT INTO public.statistics (key, value, label, display_order) VALUES
('students', '720', 'Estudiantes formados en STEM', 1),
('spaces', '+2', 'Espacios de formación activa', 2),
('hours', '1.597', 'Horas de formación académica', 3),
('sessions', '704', 'Sesiones de formación STEM', 4),
('allies', '16', 'Aliados estratégicos', 5),
('academic_hours', '1.597', 'Horas de formación académica', 6),
('university', '103', 'Jóvenes que han ingresado a la U', 7),
('leveling', '420', 'Horas de nivelación universitaria', 8),
('first_generation', '50%', 'De los egresados son la primera generación universitaria', 9);

-- Insert initial programs
INSERT INTO public.programs (slug, title, subtitle, description, color, display_order) VALUES
('eko-stem', 'EKO STEM', 'Ciencia y tecnología para transformar el futuro', 'Formamos a niños, niñas y jóvenes en robótica, programación y pensamiento computacional, que descubran su potencial y encuentren en la ciencia y la tecnología un camino de transformación.', '#7bcce7', 1),
('eko-mente', 'EKO MENTE', 'Acompañamiento que inspira confianza y aprendizaje', 'Un espacio de acompañamiento socioeconómico y educativo, que brinda tutorías y mentorías en áreas clave, fortaleciendo la confianza, el aprendizaje y el bienestar de los estudiantes.', '#63b0a5', 2),
('eko-universitario', 'EKO UNIVERSITARIO', 'Un puente hacia la educación superior', 'Programa que apoya a jóvenes para ingresar, permanecer y graduarse en la universidad, impulsando la primera generación de profesionales en sus familias y abriendo nuevas oportunidades.', '#5ea3a6', 3);

-- Insert initial settings
INSERT INTO public.settings (key, value, description) VALUES
('site_name', '"Corporación EKO BOTS"', 'Nombre del sitio web'),
('contact_whatsapp', '"+57 3116072750"', 'Número de WhatsApp'),
('footer_cta_title', '"Haz parte del equipo"', 'Título del CTA del footer'),
('footer_cta_subtitle', '"Únete a nuestra comunidad y transforma vidas a través de la educación STEM"', 'Subtítulo del CTA del footer');