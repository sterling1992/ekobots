import { Heart } from "lucide-react";

const Donate = () => {
  // Colores principales
  const BLUE_GRADIENT_FROM = "#173350";
  const BLUE_GRADIENT_TO = "#1C658A";
  const ORANGE_GRADIENT_FROM = "#FDB813";
  const ORANGE_GRADIENT_VIA = "#FF9F40";
  const ORANGE_GRADIENT_TO = "#FF7B35";

  return (
    <section className="relative w-full overflow-visible bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] lg:h-[600px] overflow-visible shadow-2xl">
        {/* Fondo azul degradado */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${BLUE_GRADIENT_FROM} 0%, ${BLUE_GRADIENT_TO} 100%)`,
          }}
        />

        

        {/* Curva tipo “barriguita” - fondo naranja (solo desktop) */}
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
            d="M 1000,0 C 1080,180 1080,420 1000,600 L 1920,600 L 1920,0 Z"
            fill="url(#orangeGradient)"
          />
        </svg>

        {/* Fondo naranja para móviles */}
        <div
          className="lg:hidden absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${ORANGE_GRADIENT_FROM} 0%, ${ORANGE_GRADIENT_VIA} 50%, ${ORANGE_GRADIENT_TO} 100%)`,
          }}
        />

        {/* Ondas suaves animadas detrás del personaje */}
        <div className="absolute left-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl animate-pulse-slow left-[10%] top-[30%]" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 blur-2xl animate-pulse-slow-delayed left-[15%] top-[50%]" />
        </div>

        {/* Grid de contenido */}
        <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Columna izquierda: Imagen */}
          <div className="relative flex items-end justify-center overflow-visible order-2 lg:order-1 h-full">
            <img
              src="/7.png"
              alt="Joven EKO BOTS"
              className="
                absolute bottom-0
                lg:-top-20
                h-[120%] sm:h-[130%] lg:h-[135%]
                w-auto object-contain object-bottom
                drop-shadow-2xl
                transition-transform duration-700 ease-out
                hover:scale-[1.03]
                z-20
              "
              style={{
                transformOrigin: "bottom center",
                filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.25))",
              }}
            />
          </div>

          {/* Columna derecha: Texto + Botón */}
          <div className="relative flex flex-col justify-center items-center text-center text-white px-6 lg:px-16 py-8 sm:py-12 order-1 lg:order-2 z-10">
            <p className="text-lg sm:text-xl lg:text-2xl italic mb-2">
              Tu apoyo cambia vidas
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-[90%]">
              Súmate para que hagamos EKO Juntos <br />
              y sigamos transformando vidas
            </h2>

            <a
              href="#donar"
              className="inline-flex items-center justify-center gap-2 bg-[#2A5F7A] text-white hover:bg-[#234A63] text-lg sm:text-xl md:text-2xl font-bold px-10 sm:px-12 md:px-16 py-4 sm:py-5 lg:py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-4 border-white"
            >
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 fill-white" />
              DONAR
            </a>
          </div>
        </div>
      </div>

      {/* Animaciones personalizadas */}
      <style jsx>{`
        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .animate-pulse-slow-delayed {
          animation: pulseSlow 10s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
};

export default Donate;