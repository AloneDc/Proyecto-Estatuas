import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-blue-900/95 backdrop-blur shadow-md py-2"
            : "bg-blue-900/80 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <Link to="/" className="flex items-center group">
              <img
                src="/images/logoMuni.png"
                alt="Logo Municipalidad"
                className="h-10 w-auto rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
              />
              <div className="ml-3">
                <span className="text-xl font-bold text-white">
                  Frías - Bicentenario
                </span>
                <span className="block text-xs text-yellow-300 font-medium mt-1">
                  200 años de historia
                </span>
              </div>
            </Link>

            {/* Navegación principal */}
            <div className="hidden md:flex items-center space-x-8">
              <NavItem to="/" label="Inicio" isActive={isActive("/")} />
              <NavItem
                to="/estatuas"
                label="Estatuas"
                isActive={isActive("/estatuas")}
              />
              <NavItem to="/mapa" label="Mapa" isActive={isActive("/mapa")} />
              <NavItem
                to="/historia"
                label="Historia"
                isActive={isActive("/historia")}
              />
              <NavItem
                to="/galeria"
                label="Galería"
                isActive={isActive("/galeria")}
              />

              <NavItem
                to="/fiestas"
                label="Fiestas"
                isActive={isActive("/fiestas")}
              />
              <NavItem
                to="/contacto"
                label="Contacto"
                isActive={isActive("/contacto")}
              />
            </div>

            {/* Botón móvil */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
                aria-label="Menú"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`transition-all duration-300 md:hidden overflow-hidden ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="bg-blue-800/95 backdrop-blur border-t border-blue-700 px-4 py-4 space-y-2">
            <MobileNavItem to="/" label="Inicio" isActive={isActive("/")} />
            <MobileNavItem
              to="#estatuas"
              label="Estatuas"
              isActive={isActive("/estatuas")}
            />
            <MobileNavItem
              to="/mapa"
              label="Mapa"
              isActive={isActive("/mapa")}
            />
            <MobileNavItem
              to="/historia"
              label="Historia"
              isActive={isActive("/historia")}
            />
            <MobileNavItem
              to="/contacto"
              label="Contacto"
              isActive={isActive("/contacto")}
            />
            <MobileNavItem
              to="/galeria"
              label="Galería"
              isActive={isActive("/galeria")}
            />
          </div>
        </div>
      </nav>

      {/* Espaciador para compensar el navbar fijo */}
      <div className="h-[64px] sm:h-[72px]"></div>
    </>
  );
}

// NavItem para desktop
function NavItem({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`relative px-2 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive ? "text-yellow-300" : "text-white hover:text-yellow-200"
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 rounded-full"></span>
      )}
    </Link>
  );
}

// NavItem para móvil
function MobileNavItem({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-yellow-400/10 text-yellow-300"
          : "text-white hover:bg-blue-700/50"
      }`}
    >
      {label}
    </Link>
  );
}

export default Navbar;
