import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      // Token inválido o expirado
      localStorage.removeItem("token");
      navigate("/acceso"); // Redirige a login, no al inicio
    }
  }, []);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000; // Convertir a milisegundos
      return Date.now() > expiry;
    } catch (error) {
      return true;
    }
  };
  const [statues, setStatues] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/estatuas")
      .then((res) => res.json())
      .then((data) => {
        setStatues(
          data.map((s) => ({
            ...s,
            image: `http://localhost:5000${s.imagen}`,
            qr: s.codigoQR ? `http://localhost:5000${s.codigoQR}` : null,
          }))
        );
      });
  }, []);

  const handleEdit = (statue) => {
    setEditingId(statue.id);
    setForm({
      nombre: statue.nombre,
      descripcion: statue.descripcion,
      ubicacion: statue.ubicacion,
      latitudReal: statue.latitudReal,
      longitudReal: statue.longitudReal,
    });
    setFile(null);
  };

  const handleInput = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (id) => {
    await fetch(`http://localhost:5000/api/estatuas/actualizar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatues((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, ...form, updatedAt: new Date().toISOString() } : s
      )
    );
    setEditingId(null);
  };

  const handleUpload = async (id) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("imagen", file);

    const res = await fetch(`http://localhost:5000/api/estatuas/${id}/imagen`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setStatues((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, image: `http://localhost:5000${data.imagen}` } : s
      )
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta estatua?")) return;

    await fetch(`http://localhost:5000/api/estatuas/eliminar/${id}`, {
      method: "DELETE",
    });

    setStatues((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-xl font-bold">🛠️ Panel de Admin</h2>
        <ul className="mt-6 space-y-3">
          <li className="bg-blue-800 py-2 px-3 rounded">Estatuas</li>
        </ul>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Gestión de Estatuas
        </h1>
        {/* Formulario para agregar nueva estatua */}
        <section className="bg-white p-6 rounded shadow mb-10 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            ➕ Agregar Nueva Estatua
          </h2>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("nombre", form.nombre || "");
              formData.append("descripcion", form.descripcion || "");
              formData.append("latitudReal", form.latitudReal || "");
              formData.append("longitudReal", form.longitudReal || "");
              if (file) formData.append("imagen", file);

              try {
                const res = await fetch(
                  "http://localhost:5000/api/estatuas/crear",
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                if (!res.ok) throw new Error("Error al agregar estatua");
                const nueva = await res.json();

                setStatues((prev) => [
                  ...prev,
                  {
                    ...nueva,
                    image: `http://localhost:5000${nueva.imagen}`,
                    qr: nueva.codigoQR
                      ? `http://localhost:5000${nueva.codigoQR}`
                      : null,
                  },
                ]);

                setForm({});
                setFile(null);
                alert("Estatua agregada correctamente ✅");
              } catch (error) {
                console.error("Error:", error);
                alert("Error al agregar estatua ❌");
              }
            }}
          >
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={form.nombre || ""}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              required
            />

            <textarea
              placeholder="Descripción"
              name="descripcion"
              value={form.descripcion || ""}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
              className="w-full border px-4 py-2 rounded"
              rows={3}
              required
            />

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Latitud"
                name="latitudReal"
                value={form.latitudReal || ""}
                onChange={(e) =>
                  setForm({ ...form, latitudReal: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Longitud"
                name="longitudReal"
                value={form.longitudReal || ""}
                onChange={(e) =>
                  setForm({ ...form, longitudReal: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              Guardar Estatua
            </button>
          </form>
        </section>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-3">Imagen</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Descripción</th>
                <th className="p-3">Coordenadas</th>
                <th className="p-3">QR</th>
                <th className="p-3">Fechas</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {statues.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="p-3">
                    <img
                      src={s.image}
                      alt={s.nombre}
                      className="w-14 h-14 object-cover rounded"
                    />
                    {editingId === s.id && (
                      <div className="mt-2 space-y-1">
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button
                          onClick={() => handleUpload(s.id)}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Subir Imagen
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3">
                    {editingId === s.id ? (
                      <input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleInput}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      s.nombre
                    )}
                  </td>

                  <td className="p-3 max-w-xs">
                    {editingId === s.id ? (
                      <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleInput}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      s.descripcion
                    )}
                  </td>

                  <td className="p-3 text-xs">
                    {editingId === s.id ? (
                      <>
                        <input
                          name="latitudReal"
                          value={form.latitudReal}
                          onChange={handleInput}
                          placeholder="Lat"
                          className="border mb-1 px-2 py-1 rounded w-full"
                        />
                        <input
                          name="longitudReal"
                          value={form.longitudReal}
                          onChange={handleInput}
                          placeholder="Lng"
                          className="border px-2 py-1 rounded w-full"
                        />
                      </>
                    ) : (
                      <>
                        <p>📍 {s.latitudReal}</p>
                        <p>🧭 {s.longitudReal}</p>
                      </>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {s.qr ? (
                      <a
                        href={s.qr}
                        download
                        className="text-blue-600 underline text-xs"
                      >
                        Descargar QR
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="p-3 text-xs text-gray-500">
                    <div>🗓️ {new Date(s.createdAt).toLocaleDateString()}</div>
                    <div>⏱️ {new Date(s.updatedAt).toLocaleDateString()}</div>
                  </td>

                  <td className="p-3 space-x-1 text-center">
                    {editingId === s.id ? (
                      <>
                        <button
                          onClick={() => handleSave(s.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(s)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
export default AdminPanel;
