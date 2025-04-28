import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const vocesDeFrias = [
  {
    nombre: "Doña Teresa, 82 años",
    frase: "Frías no es solo mi tierra, es mi historia y la de mis abuelos.",
  },
  {
    nombre: "Luis, joven artista",
    frase: "Pintar el pasado de Frías es mi forma de celebrar su futuro.",
  },
  {
    nombre: "Sara, estudiante de secundaria",
    frase: "Aquí aprendí que nuestras costumbres son parte de lo que somos.",
  },
  {
    nombre: "Don Gregorio, agricultor",
    frase: "La tierra de Frías me dio de comer, y yo la cuido con orgullo.",
  },
];

const VocesDeFrias = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-b from-blue-50 to-white py-16 px-6"
  >
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
        💬 Voces de Frías
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
        {vocesDeFrias.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white border-l-4 border-blue-400 p-5 rounded-xl shadow-lg relative"
          >
            <Quote className="absolute top-4 right-4 text-blue-200" size={28} />
            <p className="italic text-gray-700 mb-4 leading-relaxed">
              “{t.frase}”
            </p>
            <p className="text-sm font-medium text-blue-700">{t.nombre}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default VocesDeFrias;
