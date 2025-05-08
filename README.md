# 🌐 Página Web Moderna para el Bicentenario del Distrito de Frías 🇵🇪

Este proyecto conmemora los 200 años de creación política del distrito de Frías (Ayabaca, Piura – Perú), mediante una plataforma web moderna e interactiva. Integra información turística, cultural y artística del distrito, destacando 15 estatuas conmemorativas conectadas a fichas digitales mediante códigos QR.

---

## 📌 Funcionalidades principales

- Página de inicio con presentación institucional
- Visualización de 15 estatuas con su historia y multimedia
- Escaneo de códigos QR para acceder a cada ficha
- Mapa interactivo con rutas turísticas (Google Maps API)
- Panel de administración (en desarrollo) para gestión de contenido
- Sección de concursos de murales y noticias

---

## 🛠️ Tecnologías utilizadas

### Frontend (React + Vite)
- React 18.2
- Tailwind CSS 3.4
- Axios, Redux Toolkit, React Router, Lucide, Framer Motion

### Backend (Node.js + Express)
- Express 4.21, Sequelize 6.37, JWT, Multer, CORS
- PostgreSQL (AWS RDS)
- Deploy en AWS EC2

### Servicios
- Google Maps API
- Códigos QR (qrcode y qrcode.react)

---

## 🧠 Arquitectura del sistema

El proyecto está dividido en dos capas principales: frontend y backend. El frontend se comunica con el backend mediante una API REST segura, y este a su vez se conecta a una base de datos PostgreSQL desplegada en AWS.

📎 [Ver Diagrama de Arquitectura](https://github.com/usuario/repositorio/blob/main/assets/arquitectura.png)

---

## 🚀 Roadmap

| Fase                              | Estado       |
|-----------------------------------|--------------|
| Fase 1: Planificación              | ✅ Completado |
| Fase 2: Desarrollo base            | ✅ En ejecución |
| Fase 3: Panel de administración    | 🛠️ En desarrollo |
| Fase 4: Infraestructura y dominio  | 🔜 Pendiente |
| Fase 5: Lanzamiento oficial        | 🔜 Pendiente |

🗂️ [Ver Roadmap Gantt detallado](https://github.com/usuario/repositorio/blob/main/assets/roadmap.png)

---

## 👨‍💻 Autor

**Eduardo Calderón**  
Desarrollador Fullstack y creador del proyecto.  
📫 Contacto: danieleduar0911@gmail.cmo  


---

## ✅ Cómo ejecutar localmente

1. Clonar el repositorio
   ```bash
   git clone https://github.com/usuario/repositorio.git
   cd repositorio

