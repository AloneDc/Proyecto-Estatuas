import { motion } from "framer-motion";
import { Info, MapPin, CalendarDays, Landmark } from "lucide-react";

const curiosidades = [
  {
    icono: <Landmark className="text-yellow-500 w-8 h-8" />,
    titulo: "Una fundación histórica",
    texto: "Frías fue creado en 1825 por decreto del Libertador Simón Bolívar.",
  },
  {
    icono: <MapPin className="text-green-600 w-8 h-8" />,
    titulo: "La Bella Durmiente",
    texto: "Uno de sus cerros emblemáticos tiene forma de mujer recostada.",
  },
  {
    icono: <CalendarDays className="text-pink-500 w-8 h-8" />,
    titulo: "200 años de historia",
    texto: "El 2025 Frías celebrará su bicentenario como distrito político.",
  },
  {
    icono: <Info className="text-blue-600 w-8 h-8" />,
    titulo: "Tierra de Diablicos",
    texto: "El carnaval fríeño se celebra con danzas tradicionales y máscaras.",
  },
];

const SabiasQueSection = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="bg-yellow-50 py-16 px-6"
  >
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-800 text-center mb-10">
        🤔 ¿Sabías que...?
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {curiosidades.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-yellow-200 rounded-xl shadow-md p-5 text-center"
          >
            <div className="mb-4 flex justify-center">{item.icono}</div>
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
              {item.titulo}
            </h3>
            <p className="text-sm text-gray-600">{item.texto}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default SabiasQueSection;
