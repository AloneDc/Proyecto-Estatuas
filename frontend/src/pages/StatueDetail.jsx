import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Loader2,
  ArrowLeft,
  MapPin,
  Navigation,
  Calendar,
  Clock4,
  QrCode,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StatueDetail() {
  const { id } = useParams();
  const [statue, setStatue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const DEFAULT_LAT = -5.19449;
  const DEFAULT_LONG = -80.62834;

  useEffect(() => {
    const fetchStatue = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/estatuas/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener la estatua");
        const data = await res.json();
        if (!data || !data.id) throw new Error("Estatua no encontrada");
        setStatue(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar la estatua. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchStatue();
  }, [id]);

  const openGoogleMapsDirections = () => {
    if (!statue?.latitudReal || !statue?.longitudReal) return;
    const origin = `${statue.latitudPlaza || DEFAULT_LAT},${
      statue.longitudPlaza || DEFAULT_LONG
    }`;
    const destination = `${statue.latitudReal},${statue.longitudReal}`;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`,
      "_blank"
    );
  };

  const openLocationInMaps = () => {
    if (!statue?.latitudReal || !statue?.longitudReal) return;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${statue.latitudReal},${statue.longitudReal}`,
      "_blank"
    );
  };

  const getMapEmbedUrl = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !statue) return null;
    const origin = `${statue.latitudPlaza || DEFAULT_LAT},${
      statue.longitudPlaza || DEFAULT_LONG
    }`;
    const destination = `${statue.latitudReal},${statue.longitudReal}`;
    return `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&mode=walking`;
  };

  const calculateDistance = () => {
    if (!statue?.latitudReal || !statue?.longitudReal) return null;
    const lat1 = statue.latitudPlaza || DEFAULT_LAT;
    const lon1 = statue.longitudPlaza || DEFAULT_LONG;
    const lat2 = parseFloat(statue.latitudReal);
    const lon2 = parseFloat(statue.longitudReal);
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance < 1
      ? `${Math.round(distance * 1000)} metros`
      : `${distance.toFixed(2)} km`;
  };

  const galleryImages =
    statue?.galeria && Array.isArray(statue.galeria)
      ? statue.galeria.map((img) => `http://localhost:5000${img}`)
      : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-xl font-bold text-red-600">{error}</h2>
        <Link
          to="/"
          className="mt-4 text-indigo-600 hover:underline flex items-center"
        >
          <ArrowLeft className="mr-2" /> Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver a estatuas
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden shadow-lg relative"
        >
          <img
            src={`http://localhost:5000${statue.imagen}`}
            alt={statue.nombre}
            className="w-full h-72 sm:h-96 object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h1 className="text-3xl font-bold">{statue.nombre}</h1>
            <p className="text-sm mt-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Plaza de Armas de Frías
            </p>
          </div>
        </motion.div>

        <Card className="shadow-md border border-gray-100">
          <CardContent className="space-y-8 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                <Calendar className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Creación</p>
                  <p className="font-medium">
                    {new Date(statue.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                <Clock4 className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Actualización</p>
                  <p className="font-medium">
                    {new Date(statue.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                <Navigation className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Distancia</p>
                  <p className="font-medium">{calculateDistance()}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">
                {statue.descripcion}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Ubicación</h2>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src={getMapEmbedUrl()}
                  className="w-full h-72 sm:h-96"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación en mapa"
                ></iframe>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={openGoogleMapsDirections}>
                <Navigation className="mr-2 w-4 h-4" />
                Ver ruta
              </Button>
              <Button variant="outline" onClick={openLocationInMaps}>
                <MapPin className="mr-2 w-4 h-4" />
                Punto exacto
              </Button>
            </div>

            {galleryImages.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Galería</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {galleryImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Galería ${i + 1}`}
                      className="rounded-lg object-cover h-32 sm:h-40 w-full border"
                    />
                  ))}
                </div>
              </div>
            )}

            {statue.codigoQR && (
              <div className="text-center">
                <Button variant="outline" onClick={() => setShowQR(true)}>
                  <QrCode className="mr-2 w-4 h-4" /> Ver Código QR
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {showQR && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Código QR</h3>
              <img
                src={`http://localhost:5000${statue.codigoQR}`}
                alt="Código QR"
                className="w-full h-auto mx-auto"
              />
              <Button
                onClick={() => setShowQR(false)}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700 w-full"
              >
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
