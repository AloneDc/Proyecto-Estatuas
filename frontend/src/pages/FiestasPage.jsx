import React from "react";
import { motion } from "framer-motion";
import { festividades } from "../components/FestividadesSection";
import FiestasGallery from "../components/FiestasGallery";

export default function FiestasPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative bg-[url('/images/portadafrias.png')] bg-cover bg-center py-28 px-6 text-white">
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-4">
            Calendario Festivo de Frías
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Conoce todas las celebraciones tradicionales que llenan de vida y
            cultura nuestro querido distrito.
          </p>
        </motion.div>
      </section>

      {/* Lista de festividades */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
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
      <FiestasGallery />
    </main>
  );
}
