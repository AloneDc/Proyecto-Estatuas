import { useState } from "react";

function UploadImageForm({ statueId, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Selecciona un archivo antes de subirlo.");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", selectedFile);

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/estatuas/${statueId}/imagen`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error al subir la imagen");

      onUploadSuccess();
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Subiendo..." : "Subir Imagen"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default UploadImageForm;
