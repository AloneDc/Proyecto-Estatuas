import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function FestividadesHomeSection() {
  const eventos = [
    {
      fecha: "21 de junio",
      nombre: "Aniversario de Frías",
      desc: "Desfiles, ferias, serenatas, reconocimientos y eventos culturales.",
    },
    {
      fecha: "28 y 29 de julio",
      nombre: "Fiestas Patrias del Perú",
      desc: "Actos cívicos y desfiles comunales en plazas del distrito.",
    },
    {
      fecha: "13 de octubre",
      nombre: "Señor Cautivo de Ayabaca",
      desc: "Misas y caminatas simbólicas en devoción regional.",
    },
    {
      fecha: "28 de octubre",
      nombre: "Señor de los Milagros",
      desc: "Procesiones y misas al Cristo Morado.",
    },
    {
      fecha: "30 de noviembre",
      nombre: "San Andrés (Patrón)",
      desc: "Fiesta principal con feria, castillos, Diablicos y procesiones.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">
          🎊 Festividades Principales del Año
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Conoce las celebraciones más representativas del pueblo fríeño y
          participa de la tradición, fe y cultura viva.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {eventos.map((e, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-400 transition"
            >
              <p className="text-sm text-blue-600 font-medium mb-1">
                {e.fecha}
              </p>
              <h3 className="font-semibold text-lg text-blue-800">
                {e.nombre}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{e.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/fiestas"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-medium shadow transition"
          >
            Ver calendario festivo completo →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default FestividadesHomeSection;
