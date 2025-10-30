import { MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full overflow-visible">
      <div className="relative w-full min-h-[700px] lg:h-[700px] overflow-visible">
        {/* Fondo dividido con transición diagonal */}
        <div className="absolute inset-0 bg-[#1E4A61]" />
        
        {/* Transición tipo ola naranja - 65% azul / 35% naranja */}
        <svg 
          className="absolute inset-0 w-full h-full hidden lg:block" 
          viewBox="0 0 1920 700" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#FDB813' }} />
              <stop offset="50%" style={{ stopColor: '#F8A035' }} />
              <stop offset="100%" style={{ stopColor: '#F15A24' }} />
            </linearGradient>
          </defs>
          <path
            d="M 960 0
               C 920 120, 900 240, 900 350
               C 900 460, 920 580, 980 680
               C 1040 800, 960 1100, 1100 960
               L 1920 700
               L 1920 0
               Z"
            fill="url(#heroOrange)"
          />
        </svg>

        {/* Fondo naranja para móvil - mitad inferior */}
        <div className="absolute inset-x-0 top-1/2 bottom-0 lg:hidden bg-gradient-to-r from-[#FDB813] via-[#F8A035] to-[#F15A24]" />

        {/* Círculos decorativos en el lado azul */}
        <div className="absolute top-[15%] left-[8%] w-[200px] h-[200px] rounded-full border-[2px] border-white/8 blur-sm hidden lg:block" />
        <div className="absolute top-[28%] left-[12%] w-[280px] h-[280px] rounded-full border-[2px] border-white/6 blur-sm hidden lg:block" />

        {/* Contenido principal */}
        <div className="relative z-10 h-full">
          <div className="max-w-[1600px] mx-auto h-full px-6 lg:px-12">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 min-h-[700px] lg:h-full lg:items-center">
              
              {/* COLUMNA IZQUIERDA - Lado Azul */}
              <div className="flex flex-col justify-center text-white py-12 lg:py-0">
                <div className="max-w-[620px] mx-auto lg:mx-0 lg:max-w-[550px]">
                  {/* Label Programa */}
                  <p className="text-lg sm:text-xl lg:text-[20px] font-normal mb-3 sm:mb-4 italic tracking-wide">Programa</p>
                  
                  {/* Logo EKO STEM */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-7 sm:mb-8">
                    <div className="flex items-center gap-0">
                      <span className="text-[60px] sm:text-[70px] lg:text-[80px] font-bold leading-none text-white tracking-tight">E</span>
                      <span className="text-[60px] sm:text-[70px] lg:text-[80px] font-bold leading-none text-white tracking-tight">K</span>
                      
                      <div className="relative w-[65px] sm:w-[75px] lg:w-[85px] h-[65px] sm:h-[75px] lg:h-[85px] flex items-center justify-center -ml-1 sm:-ml-2">
                        <img 
                          src="public/Logo Cabeza.png" 
                          alt="Robot Head" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#E94E24] to-[#F8922E] px-7 sm:px-9 lg:px-10 py-2 sm:py-2.5 lg:py-2.5 rounded-full -ml-2 sm:-ml-3">
                      <span className="text-[50px] sm:text-[60px] lg:text-[70px] font-bold text-white leading-none">STEM</span>
                    </div>
                  </div>

                  {/* Título principal */}
                  <h1 className="text-xl sm:text-2xl lg:text-[30px] font-bold leading-[1.3] mb-7 sm:mb-8 lg:mb-10">
                    Jóvenes del Pacífico Caucano<br />
                    liderando la innovación con<br />
                    equidad y raíz territorial.
                  </h1>

                  {/* Info del curso */}
                  <div className="mb-7 sm:mb-8 lg:mb-10">
                    <p className="text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-tight">
                      Cursos presenciales
                    </p>
                    <p className="text-base sm:text-lg lg:text-[18px] italic text-white/95 mt-1">
                      (4 meses / 12 hrs semanales)
                    </p>
                  </div>

                  {/* Botón Inscribirme */}
                  <button className="bg-[#205670] hover:bg-[#1a4558] text-white font-bold text-xl sm:text-2xl lg:text-[24px] py-4 sm:py-4 lg:py-4 px-11 sm:px-13 lg:px-14 rounded-full transition-all duration-300 shadow-lg border-[3px] lg:border-[4px] border-[#2a6580]">
                    ¡Inscribirme!
                  </button>
                </div>
              </div>

              {/* COLUMNA DERECHA - Lado Naranja */}
              <div className="relative flex flex-col justify-end lg:justify-center min-h-[650px] lg:h-full py-0 lg:py-0">
                <div className="relative h-full w-full">
                  
                  {/* Contenedor de imagen */}
                  <div className="relative w-full h-full flex items-end lg:items-center justify-center">
                    {/* Imagen - Centrada en móvil, posicionada en desktop */}
                    <img 
                      src="public/1.png" 
                      alt="Participante EKO STEM"
                      className="relative w-[450px] h-[550px] sm:w-[550px] sm:h-[650px] lg:absolute lg:bottom-[-60px] lg:right-[-50px] lg:w-[700px] lg:h-[820px] object-contain object-bottom z-10"
                    />
                    
                    {/* Badge del Hashtag - Letras un poco más pequeñas */}
                    <div 
                      className="absolute z-30 bg-white rounded-[60px] sm:rounded-[65px] lg:rounded-[70px] px-7 sm:px-9 lg:px-10 py-3 sm:py-4 lg:py-5 shadow-2xl"
                      style={{ 
                        bottom: '0px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="text-[#1E4A61] font-bold text-center leading-[1.1]">
                      <p className="text-[24px] sm:text-[32px] lg:text-[38px] leading-none whitespace-nowrap">
                          <span className="text-[30px] sm:text-[38px] lg:text-[46px]">#</span> Hagamos
                        </p>
                        <p className="text-[22px] sm:text-[28px] lg:text-[34px] leading-none mt-1">
                          EKO JUNTOS
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ubicaciones - Al mismo nivel que STEM, en la zona naranja */}
                  <div className="absolute left-[20px] sm:left-[40px] lg:left-[60px] top-[8%] sm:top-[10%] lg:top-[12%] space-y-2 sm:space-y-3 lg:space-y-4 z-20">
                      <div className="flex items-center gap-2 sm:gap-3 text-white">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={2.5} fill="white" />
                        <span className="text-2xl sm:text-3xl lg:text-[44px] font-bold leading-none whitespace-nowrap">Timbiquí</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-white">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={2.5} fill="white" />
                        <span className="text-2xl sm:text-3xl lg:text-[44px] font-bold leading-none whitespace-nowrap">Guapi</span>
                      </div>
                    </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Espacio blanco inferior donde la imagen se extiende */}
      <div className="relative w-full h-[60px] bg-white hidden lg:block">
        {/* Línea de gradiente inferior - 50% del ancho (de derecha a izquierda) */}
        <div className="absolute top-16 right-0 w-[50%] h-[15px] bg-gradient-to-l from-[#1a5f61] via-[#4a9f5a] to-[#e8d639] rounded-l-full" />
      </div>
    </section>
  );
};

export default Hero;