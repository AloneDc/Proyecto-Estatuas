import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el envío real (API, etc)
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
    setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  return (
    <main className="text-gray-800">
      {/* Hero */}
      <section className="relative bg-[url('/images/portada2.jpg')] bg-cover bg-center py-24 px-6 text-white">
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-lg md:text-xl text-gray-100">
            ¿Tienes dudas, propuestas o deseas participar en el Bicentenario?
            ¡Escríbenos!
          </p>
        </motion.div>
      </section>

      {/* Formulario + Info */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Formulario */}
          <motion.div
            className="space-y-5 bg-blue-50 p-8 rounded-xl shadow text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Escríbenos
            </h2>
            <p className="text-gray-700 mb-4">
              Completa nuestro formulario oficial a través de Facilita.gob.pe
            </p>
            <a
              href="https://facilita.gob.pe/t/4261"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded shadow font-medium transition"
            >
              Ir al Formulario
            </a>
          </motion.div>

          {/* Información institucional */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-blue-800">
              Municipalidad de Frías
            </h2>
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin className="text-blue-600" />
              <p>Plaza de Armas s/n, Frías – Ayabaca – Piura, Perú</p>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <Phone className="text-blue-600" />
              <p>+51 999 999 999</p>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <Mail className="text-blue-600" />
              <p>municipio@frias.gob.pe</p>
            </div>
            <p className="text-sm text-gray-500">
              Horario de atención: Lunes a Viernes, 8:00 a.m. - 5:00 p.m.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Razones para escribirnos */}
      <section className="py-10 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            ¿Por qué escribirnos?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Tu participación es clave para el éxito del Bicentenario. Si tienes
            dudas, ideas o simplemente quieres contribuir, ¡estamos aquí para
            escucharte!
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-left">
            {[
              {
                emoji: "🎉",
                titulo: "Participar en eventos",
                desc: "Inscríbete o propone una actividad para el programa del Bicentenario.",
              },
              {
                emoji: "📸",
                titulo: "Compartir material histórico",
                desc: "¿Tienes fotos, documentos o historias sobre Frías? ¡Envíanoslas!",
              },
              {
                emoji: "🎤",
                titulo: "Contar tu testimonio",
                desc: "Queremos incluir tu voz en nuestra historia. Cuéntanos tu experiencia.",
              },
              {
                emoji: "🤝",
                titulo: "Colaborar institucionalmente",
                desc: "Organizaciones, ONG o empresas pueden sumarse como aliados.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-semibold text-blue-700">{item.titulo}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Redes sociales institucionales */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Síguenos en nuestras redes
          </h2>
          <p className="text-gray-600 mb-10">
            Mantente al día con las actividades, anuncios y momentos especiales
            del Bicentenario de Frías.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white text-lg">
            {[
              {
                nombre: "Facebook",
                url: "https://www.facebook.com/MunicipalidadDeFrias",
                color: "bg-blue-700",
                icon: <i className="fab fa-facebook-f" />,
              },
              {
                nombre: "Instagram",
                url: "https://www.instagram.com/md_frias/",
                color: "bg-pink-500",
                icon: <i className="fab fa-instagram" />,
              },

              {
                nombre: "YouTube",
                url: "https://www.youtube.com/@MunicipalidaddeFr%C3%ADas",
                color: "bg-red-600",
                icon: <i className="fab fa-youtube" />,
              },
              {
                nombre: "WhatsApp",
                url: "https://wa.me/51999999999",
                color: "bg-green-500",
                icon: <i className="fab fa-whatsapp" />,
              },
              {
                nombre: "TikTok",
                url: "https://www.tiktok.com/@municipalidaddefrias",
                color: "bg-black",
                icon: <i className="fab fa-tiktok" />,
              },
            ].map((red, i) => (
              <a
                key={i}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${red.color} w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md`}
                title={red.nombre}
              >
                {red.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
