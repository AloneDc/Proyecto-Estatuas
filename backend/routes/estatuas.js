const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const QRCode = require("qrcode");
const multer = require("multer");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const { Estatua } = require("../models");
const { PLAZA_DE_ARMAS_COORDINATES } = require("../config/constants");

// Configuración de multer para almacenamiento de imágenes con validación de tipos
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/imagenes_estatuas");
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    // Sanitizar el nombre del archivo
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    cb(null, `${Date.now()}_${sanitizedFilename}`);
  },
});

// Filtro para validar tipos de archivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Tipo de archivo no soportado. Solo se permiten imágenes (JPEG, PNG, WebP)"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter,
});

// Función para eliminar una imagen del servidor (versión async)
const deleteImage = async (imagePath) => {
  if (!imagePath) return;

  try {
    const fullPath = path.join(__dirname, "..", imagePath);
    const exists = fsSync.existsSync(fullPath);

    if (exists) {
      await fs.unlink(fullPath);
      console.log(`Imagen eliminada: ${fullPath}`);
    }
  } catch (error) {
    console.error(`Error al eliminar imagen ${imagePath}:`, error);
  }
};

// Middleware de manejo de errores para multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "La imagen excede el tamaño máximo permitido (5MB)" });
    }
    return res
      .status(400)
      .json({ error: `Error en la subida de archivo: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Middleware de validación para crear/actualizar una estatua
const validarEstatua = [
  // Validación para latitudReal
  body("latitudReal")
    .isDecimal()
    .withMessage("La latitud real debe ser un número decimal válido")
    .custom((value) => {
      const lat = parseFloat(value);
      return lat >= -90 && lat <= 90;
    })
    .withMessage("La latitud real debe estar entre -90 y 90"),

  // Validación para longitudReal
  body("longitudReal")
    .isDecimal()
    .withMessage("La longitud real debe ser un número decimal válido")
    .custom((value) => {
      const lng = parseFloat(value);
      return lng >= -180 && lng <= 180;
    })
    .withMessage("La longitud real debe estar entre -180 y 180"),

  body("nombre")
    .isString()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres")
    .escape(),

  body("descripcion")
    .isString()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("La descripción debe tener entre 10 y 2000 caracteres")
    .escape(),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: errores.array(),
      });
    }
    next();
  },
];

// Validación de ID
const validarId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo"),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ error: "ID inválido" });
    }
    next();
  },
];

// Middleware para manejar try/catch en rutas async
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 📌 Endpoint para crear una estatua con validación, imagen y QR
router.post(
  "/crear",
  upload.single("imagen"),
  handleMulterError,
  validarEstatua,
  asyncHandler(async (req, res) => {
    const { nombre, descripcion, latitudReal, longitudReal } = req.body;

    // Verificar si ya existe una estatua con el mismo nombre
    const estatuaExistente = await Estatua.findOne({
      where: { nombre: nombre.trim() },
    });

    if (estatuaExistente) {
      // Si se subió una imagen pero hubo error, eliminarla
      if (req.file) {
        await deleteImage(`/public/imagenes_estatuas/${req.file.filename}`);
      }
      return res
        .status(400)
        .json({ error: "Ya existe una estatua con ese nombre" });
    }

    // Crear la carpeta "qrcodes" si no existe
    const qrDir = path.join(__dirname, "../public/qrcodes");
    await fs.mkdir(qrDir, { recursive: true });

    // Generamos el código QR con la URL de la estatua
    const urlBase = process.env.APP_URL || "https://tuservidor.com";
    const nombreFormateado = nombre.trim().replace(/\s+/g, "-").toLowerCase();
    const urlEstatua = `${urlBase}/estatuas/${nombreFormateado}`;

    const qrFilename = `${Date.now()}_${nombreFormateado}_qr.png`;
    const qrPath = `/public/qrcodes/${qrFilename}`;
    await QRCode.toFile(path.join(__dirname, "..", qrPath), urlEstatua, {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    // Verificar si se subió una imagen y guardar su ruta
    const imagenPath = req.file
      ? `/public/imagenes_estatuas/${req.file.filename}`
      : null;

    // Guardamos en la BD con datos sanitizados
    const nuevaEstatua = await Estatua.create({
      nombre: nombre.trim(),
      descripcion: descripcion ? descripcion.trim() : null,
      imagen: imagenPath,
      codigoQR: qrPath,
      // Coordenadas de la Plaza de Armas (estáticas)
      latitudPlaza: PLAZA_DE_ARMAS_COORDINATES.lat,
      longitudPlaza: PLAZA_DE_ARMAS_COORDINATES.lng,
      // Coordenadas reales de la estatua (ingresadas por el usuario)
      latitudReal: parseFloat(latitudReal),
      longitudReal: parseFloat(longitudReal),
    });

    res.status(201).json({
      mensaje: "✅ Estatua creada correctamente",
      estatua: nuevaEstatua,
    });
  })
);

// 📌 Endpoint para obtener todas las estatuas
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const estatuas = await Estatua.findAll({
      order: [["createdAt", "DESC"]], // Ordenar por fecha de creación (más recientes primero)
    });
    res.status(200).json(estatuas);
  })
);

// 📌 Endpoint para obtener una estatua por ID
router.get(
  "/:id",
  validarId,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const estatua = await Estatua.findByPk(id);

    if (!estatua) {
      return res.status(404).json({ error: "Estatua no encontrada" });
    }

    res.status(200).json(estatua);
  })
);

// 📌 Endpoint para actualizar la imagen de una estatua
router.post(
  "/:id/imagen",
  validarId,
  upload.single("imagen"),
  handleMulterError,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const estatua = await Estatua.findByPk(id);
    if (!estatua) {
      // Si se subió una imagen pero no existe la estatua, eliminarla
      if (req.file) {
        await deleteImage(`/public/imagenes_estatuas/${req.file.filename}`);
      }
      return res.status(404).json({ error: "Estatua no encontrada" });
    }

    // Verificar si se subió una imagen
    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }

    // Guardar la nueva ruta de la imagen
    const imagenPath = `/public/imagenes_estatuas/${req.file.filename}`;

    // Eliminar la imagen anterior
    await deleteImage(estatua.imagen);

    // Actualizar la estatua con la nueva imagen
    await estatua.update({ imagen: imagenPath });

    res.status(200).json({
      mensaje: "✅ Imagen actualizada correctamente",
      imagen: imagenPath,
    });
  })
);

// 📌 Endpoint para actualizar una estatua
router.put(
  "/actualizar/:id",
  validarId,
  upload.single("imagen"),
  handleMulterError,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, latitudReal, longitudReal } = req.body;

    // Validar los datos
    const errorMessages = [];

    if (latitudReal !== undefined) {
      const lat = parseFloat(latitudReal);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        errorMessages.push("La latitud real debe estar entre -90 y 90");
      }
    }

    if (longitudReal !== undefined) {
      const lng = parseFloat(longitudReal);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        errorMessages.push("La longitud real debe estar entre -180 y 180");
      }
    }

    if (
      nombre !== undefined &&
      (nombre.trim().length < 3 || nombre.trim().length > 100)
    ) {
      errorMessages.push("El nombre debe tener entre 3 y 100 caracteres");
    }

    if (
      descripcion !== undefined &&
      (descripcion.trim().length < 10 || descripcion.trim().length > 2000)
    ) {
      errorMessages.push(
        "La descripción debe tener entre 10 y 2000 caracteres"
      );
    }

    if (errorMessages.length > 0) {
      // Si se subió una imagen pero hay errores de validación, eliminarla
      if (req.file) {
        await deleteImage(`/public/imagenes_estatuas/${req.file.filename}`);
      }
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: errorMessages,
      });
    }

    const estatua = await Estatua.findByPk(id);
    if (!estatua) {
      // Si se subió una imagen pero no existe la estatua, eliminarla
      if (req.file) {
        await deleteImage(`/public/imagenes_estatuas/${req.file.filename}`);
      }
      return res.status(404).json({ error: "Estatua no encontrada" });
    }

    // Si se cambia el nombre, verificar que no exista otro con ese nombre
    if (nombre && nombre !== estatua.nombre) {
      const estatuaExistente = await Estatua.findOne({
        where: { nombre: nombre.trim() },
      });

      if (estatuaExistente && estatuaExistente.id !== parseInt(id)) {
        // Si se subió una imagen pero hay conflicto de nombre, eliminarla
        if (req.file) {
          await deleteImage(`/public/imagenes_estatuas/${req.file.filename}`);
        }
        return res
          .status(400)
          .json({ error: "Ya existe otra estatua con ese nombre" });
      }
    }

    // Verificar si hay una nueva imagen
    let imagenPath = estatua.imagen; // Mantener la imagen actual por defecto
    if (req.file) {
      // Eliminar la imagen anterior si existe
      await deleteImage(estatua.imagen);

      // Guardar la nueva ruta de la imagen
      imagenPath = `/public/imagenes_estatuas/${req.file.filename}`;
    }

    // Actualizamos los datos con valores sanitizados
    await estatua.update({
      nombre: nombre ? nombre.trim() : estatua.nombre,
      descripcion:
        descripcion !== undefined ? descripcion.trim() : estatua.descripcion,
      imagen: imagenPath,
      // Mantenemos las coordenadas de la Plaza de Armas (no se actualizan)
      // latitudPlaza y longitudPlaza se mantienen iguales
      // Actualizamos solo las coordenadas reales si se proporcionan
      latitudReal:
        latitudReal !== undefined
          ? parseFloat(latitudReal)
          : estatua.latitudReal,
      longitudReal:
        longitudReal !== undefined
          ? parseFloat(longitudReal)
          : estatua.longitudReal,
    });

    res.status(200).json({
      mensaje: "✅ Estatua actualizada correctamente",
      estatua: {
        id: estatua.id,
        nombre: estatua.nombre,
        descripcion: estatua.descripcion,
        imagen: estatua.imagen,
        codigoQR: estatua.codigoQR,
        latitudPlaza: estatua.latitudPlaza,
        longitudPlaza: estatua.longitudPlaza,
        latitudReal: estatua.latitudReal,
        longitudReal: estatua.longitudReal,
        createdAt: estatua.createdAt,
        updatedAt: estatua.updatedAt,
      },
    });
  })
);

// 📌 Endpoint para eliminar una estatua
router.delete(
  "/eliminar/:id",
  validarId,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const estatua = await Estatua.findByPk(id);

    if (!estatua) {
      return res.status(404).json({ error: "Estatua no encontrada" });
    }

    // Eliminar la imagen y el QR asociados a la estatua
    await Promise.all([
      deleteImage(estatua.imagen),
      deleteImage(estatua.codigoQR),
    ]);

    await estatua.destroy();
    res.status(200).json({ mensaje: "✅ Estatua eliminada correctamente" });
  })
);

// Middleware para manejar errores
router.use((err, req, res, next) => {
  console.error("Error en rutas de estatuas:", err);
  res.status(500).json({
    error: "Error en el servidor",
    mensaje:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Ocurrió un error inesperado",
  });
});

module.exports = router;
