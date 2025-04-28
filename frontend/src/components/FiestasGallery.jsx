import React from "react";
import { motion } from "framer-motion";

const images = [
  { src: "/images/frias_sanandres.jpg", alt: "San Andrés" },
  { src: "/images/señorcautivo.jpg", alt: "Señor Cautivo" },
  { src: "/images/frias_señordelosmilagros.jpg", alt: "Señor de los Milagros" },
  { src: "/images/navidad-frias.jpg", alt: "Navidad en Frías" },
  { src: "/images/diablicos1.jpg", alt: "Diablicos de Frías" },
];

export default function FiestasGallery() {
  return (
    <section className="bg-white py-16 px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
          📸 Galería Festiva de Frías
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Imágenes referenciales que capturan la fe, alegría y cultura de las
          fiestas fríeñas a lo largo del año.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-60 object-cover transition duration-300 ease-in-out hover:scale-105"
              />
              <div className="text-sm text-center text-gray-700 py-2">
                {img.alt}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
