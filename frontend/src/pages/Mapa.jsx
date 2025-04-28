import React from "react";
import { motion } from "framer-motion";
import { MapPin, Sun, Navigation2, Mountain } from "lucide-react";

export default function UbicacionPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero visual */}
      <section className="relative bg-[url('/images/bella1-1.jpg')] bg-cover bg-center text-white py-28 px-6">
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Ubicación Geográfica de Frías
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Conoce dónde está Frías y cómo llegar a esta joya del ande piurano.
          </p>
        </motion.div>
      </section>

      {/* Datos rápidos */}
      <section className="py-16 px-4 md:px-10 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
            Información General del Distrito
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-blue-900 text-center">
            {[
              { icon: <MapPin />, label: "Región", value: "Piura" },
              { icon: <MapPin />, label: "Provincia", value: "Ayabaca" },
              { icon: <Mountain />, label: "Altitud", value: "1,538 m.s.n.m." },
              { icon: <Sun />, label: "Clima", value: "Templado" },
              { icon: <MapPin />, label: "Extensión", value: "589.4 km²" },
              { icon: <MapPin />, label: "Población", value: "25,000+" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-2 text-blue-700">
                  {item.icon}
                </div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-sm text-blue-800">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-16 px-4 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
            Mapa de Ubicación
          </h2>
          <p className="text-center text-gray-600 mb-6 max-w-xl mx-auto">
            Encuentra Frías en el mapa y explora su ubicación geográfica en la
            región andina del norte peruano.
          </p>
          <div className="w-full h-96 shadow-lg rounded-xl overflow-hidden">
            <iframe
              title="Mapa de Frías"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6905.718436579675!2d-79.95003106859183!3d-4.930386037660259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2spe!4v1744222384531!5m2!1ses!2spe"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-2 border-blue-200"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Clima y accesos */}
      <section className="py-16 px-4 md:px-10 bg-blue-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Condiciones Climáticas
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Frías presenta un clima templado durante la mayor parte del año,
              con lluvias entre diciembre y abril. Esto favorece la agricultura
              local y embellece su entorno montañoso.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Cómo llegar a Frías
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Desde la ciudad de Piura se accede por vía terrestre, pasando por
              Chulucanas. El camino alterna vías afirmadas y tramos rurales, por
              lo que se recomienda un vehículo adecuado.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
