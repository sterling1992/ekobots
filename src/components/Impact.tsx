import { useEffect, useState } from "react";

const Impact = () => {
  const [stats, setStats] = useState([
    { id: 1, value: "720", label: "Estudiantes formados en STEM", display_order: 1 },
    { id: 2, value: "+2", label: "Espacios de formación activa", display_order: 2 },
    { id: 3, value: "1.597", label: "Horas de formación académica", display_order: 3 },
    { id: 4, value: "704", label: "Sesiones de formación STEM", display_order: 4 },
    { id: 5, value: "16", label: "Aliados estratégicos", display_order: 5 },
    { id: 6, value: "1.597", label: "Horas de formación académica", display_order: 6 },
    { id: 7, value: "103", label: "Jóvenes que han ingresado a la U", display_order: 7 },
    { id: 8, value: "420", label: "Horas de nivelación universitaria", display_order: 8 },
    { id: 9, value: "50%", label: "De los egresados son la primera generación universitaria", display_order: 9 }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  }, []);

  if (loading) {
    return (
      <section className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <p>Cargando estadísticas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white">
      {/* Parte superior blanca con títulos */}
      <div className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1E4A61]">
              Impacto
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-[#1E4A61]">
              Impactamos vidas con STEM
            </h3>
            <p className="text-lg text-gray-700 pt-2">
              Educación, innovación y oportunidades para jóvenes del Pacífico caucano.{" "}
              <span className="text-gray-600">(Desde 2018)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Parte naranja con imagen de fondo y estadísticas */}
      <div className="relative bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 py-16 lg:py-20">
        {/* Imagen de fondo difuminada */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="public/3.JPG"
            alt="Jóvenes participantes de EKO"
            className="w-full h-full object-cover opacity-50 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/60 via-orange-400/60 to-orange-500/60" />
        </div>

        {/* Contenedor con borde decorativo */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative">
            {/* Borde decorativo amarillo-naranja */}
            <div className="absolute -inset-4 border-[6px] border-yellow-300 rounded-[100px] pointer-events-none shadow-2xl" />
            
            {/* Grid de estadísticas */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="relative overflow-hidden rounded-[2.5rem] p-8 text-center shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {/* Gradiente de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 opacity-95" />
                  
                  {/* Contenido */}
                  <div className="relative z-10">
                    <div className="text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
                      {stat.value}
                    </div>
                    <div className="text-base lg:text-lg text-white font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Parte inferior blanca (espacio) */}
      <div className="bg-white py-12 lg:py-16">
        {/* Espacio en blanco opcional para más contenido */}
      </div>
    </section>
  );
};

export default Impact;