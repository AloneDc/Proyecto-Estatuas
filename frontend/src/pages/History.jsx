import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const eventos = [
  { year: 1825, text: "Fundación del distrito por Simón Bolívar." },
  { year: 1857, text: "Ratificación por el gobierno de Ramón Castilla." },
  { year: 1950, text: "Desarrollo de vías y caminos rurales." },
  { year: 1975, text: "Expansión de servicios básicos a zonas rurales." },
  { year: 2000, text: "Modernización municipal y apertura educativa." },
  { year: 2025, text: "Celebración del Bicentenario del distrito." },
];

export default function HistoriaPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative bg-blue-900 text-white py-28 text-center px-6 bg-[url('/images/portadafrias.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 z-0" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4">Historia de Frías</h1>
          <p className="text-xl text-blue-100">
            Conoce la evolución de uno de los distritos más antiguos y
            culturales de Piura.
          </p>
        </motion.div>
      </section>

      {/* Fundación e Historia */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-3xl font-bold text-blue-800">
            📜 Fundación del Distrito
          </h2>
          <p className="text-lg text-justify text-gray-700">
            El distrito de <strong>Frías</strong> fue creado oficialmente el{" "}
            <strong>21 de junio de 1825</strong> mediante decreto del Libertador{" "}
            <strong>Simón Bolívar</strong>, y ratificado en 1857 bajo el
            gobierno de Ramón Castilla. Su nombre se atribuye al “Conde de
            Frías” o al vocablo filipino <em>friá</em>, relacionado con una
            planta medicinal. Esta fundación marcó el inicio de una historia
            rica en identidad andina, fe y cultura.
          </p>
        </motion.div>
      </section>

      {/* Línea de Tiempo */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-blue-800 text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            🕰️ Línea de Tiempo Histórica
          </motion.h2>
          <ol className="relative border-l border-blue-300 space-y-10 pl-6">
            {eventos.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <span className="absolute w-3 h-3 bg-blue-600 rounded-full left-[-8px] top-2"></span>
                <time className="block text-sm text-blue-600 font-medium">
                  {item.year}
                </time>
                <p className="text-gray-700 text-base">{item.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
      {/* Galería de imágenes antiguas */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-blue-800 text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            📸 Recuerdos de Antaño
          </motion.h2>
          <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
            Un vistazo al pasado visual de Frías: su gente, sus calles, sus
            tradiciones.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "friasplaza.jpg",
              "secundariaantigua.jpg",
              "primaria_antigua.jpg",
              "plazaantigua.jpg",
            ].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={`/images/${img}`}
                  alt={`Foto antigua ${i + 1}`}
                  className="w-full h-60 object-cover transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gobernantes históricos */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-blue-800 mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🏛️ Alcaldes Históricos de Frías
          </motion.h2>
          <div className="overflow-x-auto rounded-xl shadow border border-blue-200">
            <table className="w-full table-auto text-sm">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="px-4 py-2 text-left">Periodo</th>
                  <th className="px-4 py-2 text-left">Alcalde</th>
                  <th className="px-4 py-2 text-left">Partido / Movimiento</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 bg-white">
                {[
                  [
                    "2023–2026",
                    "Anselmo José Lizardo Flores Berru",
                    "Fuerza Regional",
                  ],
                  [
                    "2019–2022",
                    "Manuel Ricardo Córdova García",
                    "Fuerza Regional",
                  ],
                  ["2015–2018", "Manuel Magaly Elera García", "APD"],
                  ["2011–2014", "Manuel Magaly Elera García", "UPRP"],
                  [
                    "2007–2010",
                    "Manuel Magaly Elera García",
                    "Alternativa Campesina",
                  ],
                  ["2003–2006", "Manuel Holguín Rivera", "Somos Perú"],
                ].map(([periodo, nombre, partido], i) => (
                  <tr key={i} className="border-t border-blue-100">
                    <td className="px-4 py-2">{periodo}</td>
                    <td className="px-4 py-2">{nombre}</td>
                    <td className="px-4 py-2">{partido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cultura y evolución */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-yellow-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h2
            className="text-3xl font-bold text-blue-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🌾 Evolución Cultural y Social
          </motion.h2>
          <p className="text-gray-700 text-justify">
            Frías ha experimentado una evolución significativa desde su origen
            rural hacia una comunidad con visión de desarrollo. Las antiguas
            rutas de herradura fueron reemplazadas por vías afirmadas, la
            educación llegó a caseríos remotos, y las ferias se convirtieron en
            espacios de intercambio cultural y comercial.
          </p>
          <p className="text-gray-700 text-justify">
            Aunque la economía sigue siendo predominantemente agrícola, nuevas
            generaciones impulsan proyectos productivos, turismo rural, y
            valorización del patrimonio cultural. Hoy, Frías mantiene vivas sus
            raíces mientras camina hacia el futuro.
          </p>
        </div>
      </section>

      {/* Video final */}
      <section className="py-20 px-6 bg-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">🎥 Frías: Historia Viva</h2>
          <p className="text-blue-100 mb-6">
            Un homenaje en imágenes y voces al pueblo que forjó 200 años de
            legado.
          </p>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl border-4 border-red-100">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/6-7ET5Fs2cM"
              title="Historia de Frías"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
