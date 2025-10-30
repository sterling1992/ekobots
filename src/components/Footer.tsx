import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const exploreLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Programas", href: "#programas" },
    { name: "Únete", href: "#unete" },
    { name: "Donaciones", href: "#donar" },
  ];

  return (
    <footer className="relative text-white">
      {/* Fondo principal */}
      <div className="relative min-h-[500px] flex flex-col">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="public/8.JPG" 
            alt="EKO BOTS Team" 
            className="w-full h-full object-cover"
          />
          {/* Degradado superior amarillo a verde */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-300/60 via-yellow-400/70 to-teal-800/95" />
        </div>

        {/* Contenedor principal */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Banner superior */}
          <div className="pt-8 pb-6 px-4">
            <div className="container mx-auto max-w-7xl">
              <a
                href="#unete"
                className="block bg-gradient-to-r from-teal-800 via-green-700 to-yellow-400 rounded-[80px] shadow-2xl transition-transform hover:scale-[1.02]"
              >
                <div className="px-16 py-6 text-center">
                  <h2 className="text-5xl font-black text-white mb-2 leading-tight">
                    Haz parte del equipo
                  </h2>
                  <p className="text-2xl text-white font-normal underline decoration-4 underline-offset-8">
                    Click aquí para hacer parte del equipo
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Sección principal: Explora / Logo / Contáctanos */}
          <div className="flex-grow flex items-center justify-center px-4 pb-12">
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-3 gap-12 items-center text-left">
                
                {/* Columna izquierda: Explora */}
                <div className="flex justify-start">
                  <div>
                    <h4 className="text-5xl font-bold text-white mb-10">Explora</h4>
                    <ul className="space-y-5">
                      {exploreLinks.map((link) => (
                        <li key={link.name}>
                          <a 
                            href={link.href}
                            className="flex items-center text-white hover:text-yellow-200 transition-colors text-3xl"
                          >
                            <span className="mr-4 text-4xl font-bold">•</span>
                            <span className="font-normal">{link.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Logo centrado */}
                <div className="flex justify-center items-center">
                  <img 
                    src="public/logo final.png" 
                    alt="Logo EKO BOTS" 
                    className="w-64 h-auto"
                  />
                </div>

                {/* Columna derecha: Contáctanos */}
                <div className="flex justify-end">
                  <div>
                    <h4 className="text-5xl font-bold text-white mb-10">Contáctanos</h4>
                    <div className="space-y-7">
                      {/* WhatsApp */}
                      <a 
                        href="https://wa.me/5730000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5 text-white hover:text-yellow-200 transition-colors group"
                      >
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-teal-800" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                        <span className="text-3xl font-normal">+57 000 00000000</span>
                      </a>

                      {/* Facebook */}
                      <a 
                        href="https://www.facebook.com/profile.php?id=100083510792987"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5 text-white hover:text-yellow-200 transition-colors group"
                      >
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Facebook className="w-8 h-8 text-teal-800" fill="currentColor" />
                        </div>
                        <span className="text-3xl font-normal">Corporación EKO BOTS</span>
                      </a>

                      {/* Instagram */}
                      <a 
                        href="https://www.instagram.com/ekobots?igsh=MWR4b2R4MGtwNTR3dw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5 text-white hover:text-yellow-200 transition-colors group"
                      >
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Instagram className="w-8 h-8 text-teal-800" strokeWidth={2.5} />
                        </div>
                        <span className="text-3xl font-normal">ekobots</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="relative bg-teal-900 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-base text-white/90">
            &copy; {new Date().getFullYear()} Corporación EKO BOTS. Todos los derechos reservados.
          </p>
          <a 
            href="/auth" 
            className="absolute bottom-4 right-8 text-sm text-white/20 hover:text-white/40 transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;