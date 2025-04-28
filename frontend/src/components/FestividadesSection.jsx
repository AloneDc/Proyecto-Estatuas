import { motion } from "framer-motion";

export const festividades = [
  {
    fecha: "Febrero ",
    nombre: "Carnaval Fríeño",
    desc: "Juegos, danzas, 'Diablicos de Frías' y gastronomía típica.",
  },
  {
    fecha: "Marzo / Abril ",
    nombre: "Semana Santa",
    desc: "Procesiones del Jueves y Viernes Santo, misa de Pascua.",
  },
  {
    fecha: "3 de mayo",
    nombre: "Fiesta de la Cruz",
    desc: "Peregrinaciones a cruces en cerros, misas y devoción popular.",
  },

  {
    fecha: "21 de junio",
    nombre: "Aniversario de Frías",
    desc: "Desfiles, ferias, serenatas y reconocimientos culturales.",
  },
  {
    fecha: "16 de julio",
    nombre: "Virgen del Carmen",
    desc: "Misas, danzas y devoción en comunidades rurales.",
  },
  {
    fecha: "28 y 29 de julio",
    nombre: "Fiestas Patrias del Perú",
    desc: "Actos cívicos y escolares en plazas de Frías.",
  },
  {
    fecha: "15 de agosto",
    nombre: "Asunción de la Virgen María",
    desc: "Misas y procesiones en centros poblados.",
  },
  {
    fecha: "Septiembre",
    nombre: "Fiestas Patronales en Caseríos",
    desc: "Celebración de santos patronos con cultura y gastronomía.",
  },
  {
    fecha: "13 de octubre",
    nombre: "Señor Cautivo de Ayabaca",
    desc: "Misas y caminatas simbólicas desde Frías.",
  },
  {
    fecha: "28 de octubre",
    nombre: "Señor de los Milagros",
    desc: "Procesiones al Cristo Morado y liturgia local.",
  },
  {
    fecha: "30 de noviembre",
    nombre: "San Andrés (Patrón de Frías)",
    desc: "Fiesta principal con ferias, misas, danzas y castillos.",
  },
  {
    fecha: "8 de diciembre",
    nombre: "Inmaculada Concepción",
    desc: "Procesiones marianas y encuentros familiares.",
  },
  {
    fecha: "24 y 25 de diciembre",
    nombre: "Navidad",
    desc: "Chocolatadas, pesebres vivientes y actos solidarios.",
  },
];

export function FestividadesSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
          📅 Calendario Festivo de Frías
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {festividades.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-400"
            >
              <p className="text-sm text-blue-600 font-medium mb-1">
                {f.fecha}
              </p>
              <h3 className="font-semibold text-lg text-blue-800">
                {f.nombre}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
