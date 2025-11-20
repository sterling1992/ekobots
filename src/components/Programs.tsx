import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const Programs = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "EKO STEM",
      subtitle: "Ciencia y tecnología para transformar el futuro",
      description: "Formamos a niños, niñas y jóvenes en robótica, programación y pensamiento computacional, para que desarrollen su potencial y encuentren en la ciencia uy la tecnología un camino de transformación.",
      color: "#4DB8E8",
      image: "https://ekobots-images.s3.us-west-2.amazonaws.com/home_img_4",
      display_order: 1
    },
    {
      id: 2,
      title: "EKO MENTE",
      subtitle: "Acompañamiento que inspira confianza y aprendizaje",
      description: "Un espacio de acompañamiento socioeconómico y educativo, que brinda tutorías y mentorías en áreas clave, fortalecimiento la confianza, el aprendizaje y el bienestar de los estudiantes.",
      color: "#5DBDA3",
      image: "https://ekobots-images.s3.us-west-2.amazonaws.com/home_img_5",
      display_order: 2
    },
    {
      id: 3,
      title: "EKO UNIVERSITARIO",
      subtitle: "Puentes hacia la educación superior",
      description: "Programa que apoya a jóvenes para ingresar, permanecer y graduarse en la universidad, impulsando la primera generación de profesionales en sus familias y abriendo nuevas oportunidades.",
      color: "#3D7B7D",
      image: "https://ekobots-images.s3.us-west-2.amazonaws.com/home_img_6.jpg",
      display_order: 3
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <p>Cargando programas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-8 sm:mb-10 md:mb-12 lg:mb-16 space-y-2 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a3a52]">
            Nuestros programas
          </h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a3a52]">
            Son el corazón de EKO BOTS
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed pt-2">
            Espacios diseñados para que niños, niñas y jóvenes del Pacífico Caucano desarrollen habilidades STEM, fortalezcan su pensamiento crítico y encuentren en la educación una herramienta para transformar su futuro y el de sus comunidades.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {programs.map((program) => (
            <div 
              key={program.id}
              className="group relative rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div 
                  className="absolute inset-0 opacity-80" 
                  style={{ backgroundColor: program.color }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col min-h-[500px] sm:min-h-[550px] lg:min-h-[600px]">
                {/* Program Badge - Responsive circle */}
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div 
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full flex items-center justify-center shadow-xl"
                    style={{ backgroundColor: program.color, filter: 'brightness(0.95)' }}
                  >
                    <div className="text-white text-center font-bold px-4 sm:px-5 lg:px-6">
                      <div className="text-2xl sm:text-3xl leading-tight">EKO</div>
                      <div className="text-xl sm:text-2xl leading-tight mt-1 break-words">
                        {program.title.replace("EKO ", "")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Text Content */}
                <div className="space-y-3 sm:space-y-4 mt-auto">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {program.subtitle}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-white/95 leading-relaxed">
                    {program.description}
                  </p>

                  {/* CTA Button */}
                  <button 
                    className="w-full text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full flex items-center justify-center gap-2 transition-all group-hover:gap-4 mt-4 sm:mt-6 text-sm sm:text-base"
                    style={{ 
                      backgroundColor: program.color,
                      filter: 'brightness(0.95)'
                    }}
                  >
                    Conoce más
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;