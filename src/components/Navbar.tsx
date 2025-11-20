import { useState } from "react";
import { Heart, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = {
    "Inicio": null,
    "Nosotros": ["Misión", "Visión", "Equipo de Trabajo", "Datos y Estadísticas"],
    "Programas": ["Eko STEM", "Eko Mente", "Eko Universitario"],
    "Únete": null,
  };

  return (
    <nav className="w-full sticky top-0 z-50">
      <div className="w-full bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-20">
            <div className="flex-shrink-0 w-[280px]">
              <img 
                src="https://ekobots-images.s3.us-west-2.amazonaws.com/navbar-logo.png" 
                alt="EKO BOTS Logo" 
                className="h-24  w-auto"
              />
            </div>

            <div className="hidden lg:flex items-center justify-between flex-1">
              <a 
                href="/"
                className="text-[#1E4A61] font-bold text-xl hover:text-[#3DA9C5] transition-colors"
              >
                Inicio
              </a>

              <div className="relative group">
                <button 
                  className="flex items-center gap-2 text-[#1E4A61] font-bold text-xl hover:text-[#3DA9C5] transition-colors py-2"
                  onMouseEnter={() => setOpenDropdown('Nosotros')}
                >
                  Nosotros
                  <ChevronDown className="w-4 h-4" strokeWidth={3} />
                </button>
                {openDropdown === 'Nosotros' && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <a href="#mision" className="block px-4 py-2 text-sm text-[#1E4A61] hover:bg-gray-100 transition-colors">
                      Misión
                    </a>
                    <a href="#vision" className="block px-4 py-2 text-sm text-[#1E4A61] hover:bg-gray-100 transition-colors">
                      Visión
                    </a>
                    <a href="#equipo" className="block px-4 py-2 text-sm text-[#1E4A61] hover:bg-gray-100 transition-colors">
                      Equipo de Trabajo
                    </a>
                    <a href="#datos" className="block px-4 py-2 text-sm text-[#1E4A61] hover:bg-gray-100 transition-colors">
                      Datos y Estadísticas
                    </a>
                  </div>
                )}
              </div>

              <div className="relative group">
                <button 
                  className="flex items-center gap-2 text-[#1E4A61] font-bold text-xl hover:text-[#3DA9C5] transition-colors py-2"
                  onMouseEnter={() => setOpenDropdown('Programas')}
                >
                  Programas
                  <ChevronDown className="w-4 h-4" strokeWidth={3} />
                </button>
                {openDropdown === 'Programas' && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <a href="#eko-stem" className="block px-4 py-2 text-sm text-[#1E4A61] hover:bg-gray-100 transition-colors">
                      Eko STEM
                    </a>
                    <a href="#eko-mente" className="block px-4 py-2 text-sm text-[#1E4A61] hover:bg-gray-100 transition-colors">
                      Eko Mente
                    </a>
                    <a href="#eko-universitario" className="block px-4 py-2 text-sm text-[#1E4A61] hover:bg-gray-100 transition-colors">
                      Eko Universitario
                    </a>
                  </div>
                )}
              </div>

              <a 
                href="#unete"
                className="text-[#1E4A61] font-bold text-xl hover:text-[#3DA9C5] transition-colors"
              >
                Únete
              </a>
              
              <button className="bg-gradient-to-r from-[#234B62] via-[#2B6B85] to-[#3DA9C5] hover:shadow-xl text-white font-bold text-xl px-10 py-3.5 rounded-full transition-all flex items-center gap-3 shadow-lg">
                <Heart className="w-6 h-6 fill-current" />
                DONAR
              </button>
            </div>

            <button 
              className="lg:hidden ml-auto p-2 text-[#1E4A61] hover:text-[#3DA9C5] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
              {Object.entries(menuItems).map(([item, subitems]) => (
                <div key={item}>
                  {subitems ? (
                    <>
                      <button 
                        className="w-full flex items-center justify-between px-4 py-2 text-[#1E4A61] font-bold hover:bg-gray-100 transition-colors rounded-lg"
                        onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                      >
                        {item}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item && (
                        <div className="pl-4 space-y-1">
                          {subitems.map((subitem) => (
                            <a
                              key={subitem}
                              href={`#${subitem.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              {subitem}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a 
                      href={item === "Inicio" ? "/" : `#${item.toLowerCase()}`}
                      className="block px-4 py-2 text-[#1E4A61] font-bold hover:bg-gray-100 transition-colors rounded-lg"
                    >
                      {item}
                    </a>
                  )}
                </div>
              ))}
              <div className="px-4 pt-2">
                <button className="w-full bg-gradient-to-r from-[#1E4A61] to-[#3DA9C5] hover:opacity-90 text-white font-bold px-6 py-3 rounded-full transition-opacity flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  DONAR
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;