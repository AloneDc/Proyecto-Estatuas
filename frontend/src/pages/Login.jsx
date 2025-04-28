import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Ya tienes sesión activa
      navigate("/admin");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/admin";
    } else {
      setErrorMsg(data.error || "Error en el login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          🔒 Acceso Administrativo
        </h2>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm">
            {errorMsg}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-blue-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-2 border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 px-4 py-2 rounded-lg transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-blue-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border-2 border-blue-100 focus:border-blue-400 focus:ring focus:ring-blue-200 px-4 py-2 rounded-lg transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
