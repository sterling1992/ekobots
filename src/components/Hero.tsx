import { MapPin } from "lucide-react";

const Hero = () => {
  const BLUE_LEFT = "#12263A";
  const BLUE_RIGHT = "#2B7AA8";

  const ORANGE_FROM = "#FDB813";
  const ORANGE_VIA = "#F8A035";
  const ORANGE_TO = "#F15A24";

  return (
    <section className="relative w-full overflow-visible">
      <div className="relative w-full min-h-[750px] lg:h-[750px] overflow-visible">
        {/* Fondo azul con degradado */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${BLUE_LEFT} 0%, ${BLUE_RIGHT} 100%)`,
          }}
        />

        {/* Curva Premium S-Weave */}
        <svg
          className="absolute inset-0 w-full h-full hidden lg:block"
          viewBox="0 0 1920 750"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={ORANGE_FROM} />
              <stop offset="50%" stopColor={ORANGE_VIA} />
              <stop offset="100%" stopColor={ORANGE_TO} />
            </linearGradient>
          </defs>

          <path
            d="
              M 0 0
              C 450 120, 750 180, 980 300
              C 1200 420, 1350 580, 1920 520
              L 1920 0
              Z
            "
            fill="url(#heroOrange)"
          />
        </svg>

        {/* Fondo naranja móvil */}
        <div
          className="absolute inset-x-0 top-1/2 bottom-0 lg:hidden"
          style={{
            background: `linear-gradient(to bottom, ${ORANGE_FROM} 0%, ${ORANGE_VIA} 50%, ${ORANGE_TO} 100%)`,
          }}
        />

        {/* Burbujas decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 blur-xl animate-bubble"
              style={{
                width: `${40 + Math.random() * 40}px`,
                height: `${40 + Math.random() * 40}px`,
                left: `${10 + Math.random() * 40}%`,
                bottom: `${Math.random() * 10}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 h-full">
          <div className="max-w-[1600px] mx-auto h-full px-6 lg:px-12">
            <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[750px] lg:h-full lg:items-center">
              
              {/* COLUMNA IZQUIERDA */}
              <div className="flex flex-col justify-center text-white py-12 lg:py-0">
                <div className="max-w-[580px] mx-auto lg:mx-0 space-y-5">
                  {/* Etiqueta */}
                  <p className="text-lg sm:text-xl italic tracking-wide text-white/80">
                    Programa
                  </p>

                  {/* Logo EKO STEM */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-2">
                    <div className="flex items-center gap-0">
                      <span className="text-[70px] lg:text-[80px] font-extrabold leading-none">E</span>
                      <span className="text-[70px] lg:text-[80px] font-extrabold leading-none">K</span>
                      <div className="relative w-[70px] lg:w-[85px] h-[70px] lg:h-[85px] flex items-center justify-center -ml-2">
                        <img
                          src="https://ekobots-images.s3.us-west-2.amazonaws.com/home_img_1.png"
                          alt="Robot Head"
                          className="object-contain w-[90px] h-[90px] lg:w-[120px] lg:h-[120px]"
                        />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#E94E24] to-[#F8922E] px-7 lg:px-10 py-2 rounded-full -ml-3">
                      <span className="text-[60px] lg:text-[70px] font-bold text-white leading-none">STEM</span>
                    </div>
                  </div>

                  {/* Texto principal */}
                  <h1 className="text-xl sm:text-2xl lg:text-[30px] font-semibold leading-[1.4]">
                    Jóvenes del Pacífico Caucano<br />
                    liderando la innovación con<br />
                    equidad y raíz territorial.
                  </h1>

                  {/* Subtexto */}
                  <div>
                    <p className="text-xl sm:text-[26px] font-bold mt-3">
                      Cursos presenciales
                    </p>
                    <p className="text-base sm:text-lg italic text-white/90 mt-1">
                      (4 meses / 12 hrs semanales)
                    </p>
                  </div>

                  {/* Botón */}
                  <button className="bg-[#205670] hover:bg-[#1a4558] text-white font-bold text-lg sm:text-xl py-4 px-10 rounded-full transition-all duration-300 shadow-lg border-[3px] border-[#2a6580] mt-4">
                    ¡Inscribirme!
                  </button>
                </div>
              </div>

              {/* COLUMNA DERECHA */}
              <div className="relative flex flex-col justify-end lg:justify-center min-h-[820px] lg:h-full">
                <div className="relative h-full w-full flex items-end lg:items-center justify-center">
                  <img
                    src="public/1.png"
                    alt="Participante EKO STEM"
                    className="
                      relative
                      lg:absolute lg:right-[-60px]
                      lg:w-[760px] lg:h-[880px]
                      w-[440px] h-[540px] sm:w-[520px] sm:h-[620px]
                      object-contain z-10
                    "
                    style={{ bottom: "-40px" }} // hace que toque la barra inferior
                  />

                  {/* Hashtag */}
                  <div
                    className="absolute z-30 bg-white rounded-[70px] px-10 py-5 shadow-2xl"
                    style={{
                      bottom: "0px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="text-[#1E4A61] font-bold text-center leading-[1.1]">
                      <p className="text-[38px] leading-none whitespace-nowrap">
                        <span className="text-[46px]">#</span> Hagamos
                      </p>
                      <p className="text-[34px] leading-none mt-1">
                        EKO JUNTOS
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ubicaciones */}
                <div className="absolute right-[9%] top-[20%] flex flex-col gap-4 text-white z-20 text-shadow-md">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-7 h-7 fill-white" strokeWidth={2.5} />
                    <span className="text-[40px] font-semibold tracking-tight">Timbiquí</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-7 h-7 fill-white" strokeWidth={2.5} />
                    <span className="text-[40px] font-semibold tracking-tight">Guapi</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Franja inferior */}
      <div className="relative w-full h-[80px] bg-white hidden lg:block">
        <div className="absolute top-[35px] right-0 w-[55%] h-[16px] rounded-l-full bg-gradient-to-l from-[#F15A24] via-[#FDB813] to-[#2B7AA8]" />
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { opacity: 0.9; }
          100% { transform: translateY(-600px) scale(1.2); opacity: 0; }
        }

        .animate-bubble {
          animation: bubble 10s ease-in-out infinite;
        }

        .text-shadow-md {
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default Hero;


// import { MapPin } from "lucide-react";

// const Hero = () => {
//   const BLUE_LEFT = "#16314F";
//   const BLUE_RIGHT = "#2384B4";
//   const ORANGE_FROM = "#FDB813";
//   const ORANGE_VIA = "#F8A035";
//   const ORANGE_TO = "#F15A24";

//   return (
//     <section className="relative w-full overflow-visible">
//       <div className="relative w-full min-h-[700px] lg:h-[700px] overflow-visible">
//         {/* Fondo azul con degradado */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background: `linear-gradient(135deg, ${BLUE_LEFT} 0%, ${BLUE_RIGHT} 100%)`,
//           }}
//         />

//         {/* Curva “barriguita” */}
//         <svg
//           className="absolute inset-0 w-full h-full hidden lg:block"
//           viewBox="0 0 1920 700"
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <linearGradient id="heroOrange" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor={ORANGE_FROM} />
//               <stop offset="50%" stopColor={ORANGE_VIA} />
//               <stop offset="100%" stopColor={ORANGE_TO} />
//             </linearGradient>
//           </defs>
//           <path
//             d="
//               M 1080 0
//               C 1180 200, 1220 420, 1080 580
//               C 980 650, 940 700, 1920 700
//               L 1920 0
//               Z
//             "
//             fill="url(#heroOrange)"
//           />
//         </svg>

//         {/* Fondo naranja móvil */}
//         <div
//           className="absolute inset-x-0 top-1/2 bottom-0 lg:hidden"
//           style={{
//             background: `linear-gradient(to bottom, ${ORANGE_FROM} 0%, ${ORANGE_VIA} 50%, ${ORANGE_TO} 100%)`,
//           }}
//         />

//         {/* Burbujas decorativas */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute rounded-full bg-white/10 blur-xl animate-bubble"
//               style={{
//                 width: `${40 + Math.random() * 40}px`,
//                 height: `${40 + Math.random() * 40}px`,
//                 left: `${10 + Math.random() * 40}%`,
//                 bottom: `${Math.random() * 10}%`,
//                 animationDelay: `${i * 2}s`,
//                 animationDuration: `${8 + Math.random() * 6}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* CONTENIDO */}
//         <div className="relative z-10 h-full">
//           <div className="max-w-[1600px] mx-auto h-full px-6 lg:px-12">
//             <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[700px] lg:h-full lg:items-center">
              
//               {/* COLUMNA IZQUIERDA */}
//               <div className="flex flex-col justify-center text-white py-12 lg:py-0">
//                 <div className="max-w-[580px] mx-auto lg:mx-0 space-y-5">
//                   {/* Etiqueta */}
//                   <p className="text-lg sm:text-xl italic tracking-wide text-white/80">
//                     Programa
//                   </p>

//                   {/* Logo EKO STEM */}
//                   <div className="flex items-center gap-3 sm:gap-4 mb-2">
//                     <div className="flex items-center gap-0">
//                       <span className="text-[70px] lg:text-[80px] font-extrabold leading-none">E</span>
//                       <span className="text-[70px] lg:text-[80px] font-extrabold leading-none">K</span>
//                       <div className="relative w-[70px] lg:w-[85px] h-[70px] lg:h-[85px] flex items-center justify-center -ml-2">
//                         <img
//                           src="public/Logo Cabeza.png"
//                           alt="Robot Head"
//                           className="w-full h-full object-contain"
//                         />
//                       </div>
//                     </div>
//                     <div className="bg-gradient-to-r from-[#E94E24] to-[#F8922E] px-7 lg:px-10 py-2 rounded-full -ml-3">
//                       <span className="text-[60px] lg:text-[70px] font-bold text-white leading-none">STEM</span>
//                     </div>
//                   </div>

//                   {/* Texto principal */}
//                   <h1 className="text-xl sm:text-2xl lg:text-[30px] font-semibold leading-[1.4]">
//                     Jóvenes del Pacífico Caucano<br />
//                     liderando la innovación con<br />
//                     equidad y raíz territorial.
//                   </h1>

//                   {/* Subtexto */}
//                   <div>
//                     <p className="text-xl sm:text-[26px] font-bold mt-3">
//                       Cursos presenciales
//                     </p>
//                     <p className="text-base sm:text-lg italic text-white/90 mt-1">
//                       (4 meses / 12 hrs semanales)
//                     </p>
//                   </div>

//                   {/* Botón */}
//                   <button className="bg-[#205670] hover:bg-[#1a4558] text-white font-bold text-lg sm:text-xl py-4 px-10 rounded-full transition-all duration-300 shadow-lg border-[3px] border-[#2a6580] mt-4">
//                     ¡Inscribirme!
//                   </button>
//                 </div>
//               </div>

//               {/* COLUMNA DERECHA */}
//               <div className="relative flex flex-col justify-end lg:justify-center min-h-[735px] lg:h-full">
//                 <div className="relative h-full w-full flex items-end lg:items-center justify-center">
//                   <img
//                     src="public/1.png"
//                     alt="Participante EKO STEM"
//                     className="relative w-[460px] h-[560px] sm:w-[570px] sm:h-[270px] lg:absolute lg:bottom-[0px] lg:right-[-60px] lg:w-[720px] lg:h-[830px] object-contain z-10"
//                   />

//                   {/* Hashtag */}
//                   <div
//                     className="absolute z-30 bg-white rounded-[70px] px-10 py-5 shadow-2xl"
//                     style={{
//                       bottom: "0px",
//                       left: "50%",
//                       transform: "translateX(-50%)",
//                     }}
//                   >
//                     <div className="text-[#1E4A61] font-bold text-center leading-[1.1]">
//                       <p className="text-[38px] leading-none whitespace-nowrap">
//                         <span className="text-[46px]">#</span> Hagamos
//                       </p>
//                       <p className="text-[34px] leading-none mt-1">
//                         EKO JUNTOS
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Ubicaciones reubicadas */}
//                 <div className="absolute right-[9%] top-[22%] flex flex-col gap-3 text-white z-20 text-shadow-md">
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-6 h-6 lg:w-7 lg:h-7 fill-white" strokeWidth={2.5} />
//                     <span className="text-[36px] lg:text-[40px] font-semibold tracking-tight">
//                       Timbiquí
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-6 h-6 lg:w-7 lg:h-7 fill-white" strokeWidth={2.5} />
//                     <span className="text-[36px] lg:text-[40px] font-semibold tracking-tight">
//                       Guapi
//                     </span>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Franja inferior ajustada */}
//       <div className="relative w-full h-[80px] bg-white hidden lg:block">
//         <div className="absolute top-[35px] right-0 w-[55%] h-[16px] rounded-l-full bg-gradient-to-l from-[#F15A24] via-[#FDB813] to-[#2384B4]" />
//       </div>

//       {/* Animaciones */}
//       <style>{`
//   @keyframes bubble {
//     0% {
//       transform: translateY(0) scale(1);
//       opacity: 0.6;
//     }
//     50% {
//       opacity: 0.9;
//     }
//     100% {
//       transform: translateY(-600px) scale(1.2);
//       opacity: 0;
//     }
//   }

//   .animate-bubble {
//     animation: bubble 10s ease-in-out infinite;
//   }

//   .text-shadow-md {
//     text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
//   }
// `}</style>
//     </section>
//   );
// };

// export default Hero;

