import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export default function EstatuasPage() {
  const [statues, setStatues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebounce(searchTerm, 300);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatues = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/estatuas");
        const data = await res.json();
        setStatues(data);
        setError("");
      } catch {
        setError("No se pudo cargar la información.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatues();
  }, []);

  const filtered = statues.filter((s) =>
    s.nombre.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-800 px-4 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Título principal */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4">
            Estatuas Históricas de Frías
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recorre los íconos culturales que representan la memoria viva de
            nuestra comunidad.
          </p>
        </motion.div>

        {/* Buscador */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Input
            type="text"
            value={searchTerm}
            placeholder="Buscar estatua por nombre..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl shadow-lg border border-blue-200 pl-12 text-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Contenido de estatuas */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No se encontraron estatuas.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((statue, i) => (
              <motion.div
                key={statue.id}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-xl overflow-hidden flex flex-col h-full">
                  <img
                    src={`http://localhost:5000${statue.imagen}`}
                    alt={statue.nombre}
                    className="h-52 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                      {statue.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {statue.descripcion}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/estatua/${statue.id}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Ver Detalle
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
