import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";

const Topbar = () => {
  return (
    <div className="w-full h-auto sm:h-14 bg-gradient-to-r from-[#16304d] via-[#1a5d7a] to-[#24a2d1]">
      <div className="container mx-auto h-full flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 sm:py-0 gap-3 sm:gap-0">
        {/* Contacto */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 w-full sm:w-auto">
          <a 
            href="mailto:info@ekobots.org" 
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#16304d]" />
            </div>
            <span className="text-xs sm:text-sm font-medium">info@ekobots.org</span>
          </a>
          
          <a 
            href="tel:+573116072750" 
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#16304d]" />
            </div>
            <span className="text-xs sm:text-sm font-medium">+573116072750</span>
          </a>
        </div>

        {/* Redes Sociales */}
        <div className="flex items-center gap-3">
          <a 
            href="https://www.facebook.com/profile.php?id=100083510792987" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#16304d]" fill="currentColor" />
          </a>
          
          <a 
            href="https://www.instagram.com/ekobots?igsh=MWR4b2R4MGtwNTR3dw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#16304d]" />
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#16304d]" fill="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;