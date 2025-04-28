function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">Proyecto de las 15 Estatuas</h3>
            <p className="mt-2 text-gray-300">
              Descubre la historia y cultura de nuestra ciudad.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Enlaces útiles</h4>
            <ul className="mt-2 text-gray-300">
              <li>
                <a href="/estatuas" className="hover:text-white">
                  Estatuas
                </a>
              </li>
              <li>
                <a href="/murales" className="hover:text-white">
                  Concurso de Murales
                </a>
              </li>
              <li>
                <a href="/contacto" className="hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Síguenos</h4>
            <div className="mt-2 flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.61 8.09 8.29 9.46v-6.69h-2.49v-2.77h2.49v-2.12c0-2.45 1.49-3.79 3.68-3.79 1.07 0 2.19.19 2.19.19v2.41h-1.23c-1.21 0-1.59.75-1.59 1.52v1.84h2.71l-.43 2.77h-2.28v6.69c4.68-1.37 8.29-5.05 8.29-9.46 0-5.5-4.46-9.96-9.96-9.96z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.02 9.02 0 01-2.86 1.09 4.51 4.51 0 00-7.69 4.11 12.81 12.81 0 01-9.3-4.71 4.51 4.51 0 001.39 6.02 4.49 4.49 0 01-2.04-.56v.06a4.51 4.51 0 003.62 4.42 4.52 4.52 0 01-2.04.08 4.51 4.51 0 004.21 3.13 9.05 9.05 0 01-5.6 1.93c-.37 0-.73-.02-1.09-.06a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58a9.17 9.17 0 002.26-2.34z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.56v14.91c0 .98-.81 1.78-1.79 1.78h-20.5c-.98 0-1.79-.8-1.79-1.78v-14.91c0-.98.81-1.78 1.79-1.78h20.5c.98 0 1.79.8 1.79 1.78zm-11.5 7.37l-5.75 3.22v-6.44l5.75 3.22zm6.75-3.22v6.44l-5.75-3.22 5.75-3.22z" />
                </svg>
              </a>
            </div>
            <div className="mt-8 text-[8px] text-transparent hover:text-blue-500 text-center transition">
              <a href="/acceso" className="hover:underline">
                acceso
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-300">
          <p>
            © 2025 Proyecto hecho por EduarDev. Todos los derechos reservados.
          </p>
        </div>
      </div>
      <div className="mt-8 text-[10px] text-gray-300 text-center"></div>
    </footer>
  );
}

export default Footer;
