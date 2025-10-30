import { Heart } from "lucide-react";

const Donate = () => {
  const EKO_STEM_BLUE = "#1D577D";

  // Colores del gradiente naranja-rojo del fondo derecho
  const ORANGE_GRADIENT_FROM = "#FDB813"; 
  const ORANGE_GRADIENT_VIA = "#FF9F40";
  const ORANGE_GRADIENT_TO = "#FF7B35";

  return (
    <section className="relative w-full overflow-hidden bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[600px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
          
          {/* Fondo azul - 50% izquierda */}
          <div className="absolute inset-0" style={{ backgroundColor: EKO_STEM_BLUE }} />
          
          {/* Curva de transición - naranja 50% derecha - SOLO EN DESKTOP */}
          <svg 
            className="hidden lg:block absolute inset-0 w-full h-full" 
            viewBox="0 0 1920 600" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ORANGE_GRADIENT_FROM} />
                <stop offset="50%" stopColor={ORANGE_GRADIENT_VIA} />
                <stop offset="100%" stopColor={ORANGE_GRADIENT_TO} />
              </linearGradient>
            </defs>
            <path
              d="M 860,0 
                C 900,60 920,120 930,200 
                C 940,280 930,360 920,440 
                C 900,520 860,580 860,600 
                L 1920,600 
                L 1920,0 Z"
              fill="url(#orangeGradient)"
            />
          </svg>

          {/* Fondo naranja para móvil - SOLO EN MÓVIL */}
          <div 
            className="lg:hidden absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${ORANGE_GRADIENT_FROM} 0%, ${ORANGE_GRADIENT_VIA} 50%, ${ORANGE_GRADIENT_TO} 100%)`
            }}
          />

          {/* Grid de contenido */}
          <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* COLUMNA IZQUIERDA - Imagen */}
            <div className="relative flex items-end justify-center overflow-hidden order-2 lg:order-1 h-full">
              {/* Fondo azul para la sección de imagen en móvil */}
              <div 
                className="lg:hidden absolute inset-0"
                style={{ backgroundColor: EKO_STEM_BLUE }}
              />
              
              <img 
                src="public/7.png" 
                alt="Joven EKO BOTS" 
                className="relative h-full w-auto object-contain object-bottom mx-auto lg:mx-0"
                style={{ 
                  maxWidth: 'none'
                }}
              />
            </div>

            {/* COLUMNA DERECHA - Contenido de texto */}
            <div className="relative flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12 order-1 lg:order-2">
              <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-lg">
                <p className="text-lg sm:text-xl lg:text-2xl font-normal italic leading-relaxed">
                  Tu apoyo cambia vidas
                </p>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Súmate<br />
                  a transformar<br />
                  el futuro
                </h2>

                <div className="pt-4 sm:pt-5 md:pt-6">
                  <a 
                    href="#donar"
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#2A5F7A] text-white hover:bg-[#234A63] text-base sm:text-lg md:text-xl lg:text-2xl font-bold px-8 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-3 sm:border-4 border-white"
                  >
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 fill-white" />
                    DONAR
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;