import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

const galeria = {
  Atardeceres: [
    "/images/atardecer1.jpg",
    "/images/atardecer2.jpg",
    "/images/atardecer3.jpg",
  ],
  Noches: ["/images/noche1.jpg", "/images/noche2.jpg", "/images/noche3.jpg"],
  Paisajes: [
    "/images/paisaje1.jpg",
    "/images/paisaje2.jpg",
    "/images/paisaje3.jpg",
  ],
  "Lugares Emblemáticos": [
    "/images/luga1.jpg",
    "/images/lugar2.jpg",
    "/images/lugar3.jpg",
  ],
};

export default function GaleriaPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (categoria, index) => {
    setCurrentCategoria(categoria);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleKeyDown = (e) => {
    if (!modalOpen) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  const goNext = () => {
    const total = galeria[currentCategoria].length;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    const total = galeria[currentCategoria].length;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <main className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">
            Galería Fotográfica de Frías
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capturas de nuestra esencia natural, cultural y espiritual.
          </p>
        </motion.div>

        {/* Categorías */}
        {Object.entries(galeria).map(([categoria, imagenes]) => (
          <section key={categoria} className="mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-green-800 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              📸 {categoria}
            </motion.h2>

            {/* Grid de imágenes */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
              {imagenes.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-lg cursor-pointer bg-white"
                  onClick={() => openModal(categoria, i)}
                >
                  <img
                    src={src}
                    alt={`${categoria} ${i + 1}`}
                    className="w-full h-48 object-cover hover:opacity-90 transition"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galeria[currentCategoria][currentIndex]}
              alt="Imagen ampliada"
              className="rounded-lg object-contain w-full max-h-[80vh] shadow-xl"
            />

            {/* Botones navegación */}
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 shadow"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 shadow"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 shadow"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
