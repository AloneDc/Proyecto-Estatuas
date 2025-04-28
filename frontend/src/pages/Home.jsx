import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDebounce } from "use-debounce";
import { Search, X, ChevronRight, ChevronLeft } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import FestividadesHomeSection from "../components/FestividadesHomeSection";
import VocesDeFrias from "../components/VocesDeFrias";
import SabiasQueSection from "../components/SabiasQueSection";

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 bg-blue-100 rounded-full p-2 hover:bg-blue-200 transition"
    onClick={onClick}
  >
    <ChevronRight className="text-blue-600" />
  </button>
);

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 bg-blue-100 rounded-full p-2 hover:bg-blue-200 transition"
    onClick={onClick}
  >
    <ChevronLeft className="text-blue-600" />
  </button>
);

const StatueCard = React.memo(({ statue }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="group shadow hover:shadow-lg transition rounded-xl overflow-hidden h-full flex flex-col bg-white">
      <div className="overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}${statue.imagen}`}
          alt={statue.nombre}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4 flex flex-col space-y-2 flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {statue.nombre}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {statue.descripcion}
        </p>

        <Link
          to={`/estatua/${statue.id}`}
          className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center text-sm"
        >
          Ver más
        </Link>
      </CardContent>
    </Card>
  </motion.div>
));

export default function HomePage() {
  const [statues, setStatues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const fetchStatues = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/estatuas`);

      if (!res.ok) throw new Error("Error al cargar estatuas");
      const data = await res.json();
      setStatues(data);
      setError(null);
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatues();
  }, [fetchStatues]);

  const filteredStatues = React.useMemo(
    () =>
      statues.filter((s) =>
        s.nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ),
    [statues, debouncedSearchTerm]
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, filteredStatues.length),
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };
  const imagenesDestacadas = [
    "/images/atardecer3.jpg",
    "/images/noche1.jpg",
    "/images/paisaje2.jpg",
    "/images/noche3.jpg",
  ];

  return (
    <>
      {/* Cuenta regresiva flotante */}
      <CountdownTimer />

      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero */}
        <section className="relative w-full h-[50vh] flex items-center justify-center text-white text-center overflow-hidden">
          {/* 🎥 VIDEO DE FONDO */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            poster="/images/bella1-1.jpg"
          >
            <source src="/videos/video_frias.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>

          {/* 🔳 Capa oscura encima del video */}
          <div className="absolute inset-0 bg-black/60 z-0" />

          {/* 💬 Contenido encima */}
          <motion.div
            className="relative z-10 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
              Bicentenario del Distrito de Frías
            </h1>
            <p className="text-lg sm:text-xl mb-6">
              200 años de historia, cultura y tradición viva.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700 px-6 py-3 text-white font-semibold shadow">
                <a href="#estatuas">Explorar Estatuas</a>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-6 py-3"
              >
                <Link to="/mapa">Ver Mapa</Link>
              </Button>
            </div>
          </motion.div>
        </section>
        {/* Datos del distrito */}
        <section className="bg-gradient-to-b from-white to-blue-100 py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-10">
              Frías en Datos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-blue-900">
              {[
                { label: "Fundación", value: "1825" },
                { label: "Habitantes", value: "25,000+" },
                { label: "Altitud", value: "1,650 msnm" },
                { label: "Estatuas", value: "15" },
              ].map((item, i) => (
                <div key={i} className="bg-white shadow rounded-xl p-6">
                  <div className="text-2xl font-bold text-blue-700">
                    {item.value}
                  </div>
                  <div className="text-sm mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Buscador */}

        {/* Estatuas */}
        <motion.section
          id="estatuas"
          className="py-16 px-4 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-10">
              Descubre las Estatuas Históricas
            </h2>
            <motion.section
              className="px-6 py-10 bg-gray-50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="max-w-2xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="Buscar estatuas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 pl-12 rounded-xl shadow border border-blue-300 focus:ring focus:ring-blue-200"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    aria-label="Limpiar"
                  >
                    <X className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </motion.section>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-72 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="text-center bg-red-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  Error
                </h3>
                <p className="text-gray-700 mb-4">{error}</p>
                <Button
                  onClick={fetchStatues}
                  className="bg-blue-600 text-white"
                >
                  Reintentar
                </Button>
              </div>
            ) : filteredStatues.length > 0 ? (
              <Slider {...sliderSettings} className="pb-10">
                {filteredStatues.map((statue) => (
                  <div key={statue.id} className="px-3 h-full">
                    <StatueCard statue={statue} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="text-center bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-600 mb-4">
                  No se encontraron estatuas con ese nombre.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="text-blue-600 border-blue-600"
                >
                  Mostrar todas
                </Button>
              </div>
            )}
          </div>
        </motion.section>
        {/* Lo que hace único a Frías */}
        <motion.section
          className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-10">
              Lo que hace único a Frías
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-base sm:text-lg">
              Tierra de costumbres, historia viva y sabores que nos conectan con
              nuestras raíces.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  titulo: "Gastronomía tradicional",
                  descripcion:
                    "Sabores únicos como el seco de chabelo y tamales con ají de maní.",
                  icon: "🍲",
                },
                {
                  titulo: "Danzas típicas",
                  descripcion:
                    "Celebraciones llenas de ritmo con trajes coloridos y cultura viva.",
                  icon: "💃",
                },
                {
                  titulo: "Artesanía local",
                  descripcion:
                    "Textiles, cerámica y tallados con herencia ancestral.",
                  icon: "🧵",
                },
                {
                  titulo: "Riqueza natural",
                  descripcion:
                    "Paisajes verdes, ríos y cerros que rodean el distrito.",
                  icon: "🌄",
                },
                {
                  titulo: "Festividades religiosas",
                  descripcion:
                    "Devoción y fe presentes en cada fiesta patronal.",
                  icon: "⛪",
                },
                {
                  titulo: "Lugares históricos",
                  descripcion:
                    "Estatuas, templos y plazas que cuentan nuestra historia.",
                  icon: "🏛️",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-left flex items-start space-x-4 border border-blue-100"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-4xl text-blue-700">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      {item.titulo}
                    </h3>
                    <p className="text-sm text-gray-600">{item.descripcion}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Galería Preview */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              📸 Galería de Frías
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Recorrido visual por paisajes, festividades y rincones
              emblemáticos del distrito y sus alrededores.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {imagenesDestacadas.map((src, i) => (
                <motion.div
                  key={i}
                  className="rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={src}
                    alt={`Galería ${i + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <Link
              to="/galeria"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded shadow transition"
            >
              Ver Galería Completa
            </Link>
          </div>
        </section>
        <VocesDeFrias />
        <FestividadesHomeSection />
        <SabiasQueSection />
      </div>
    </>
  );
}
