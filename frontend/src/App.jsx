import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home";
import StatueDetail from "./pages/StatueDetail";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import History from "./pages/History";
import Mapa from "./pages/Mapa";
import ContactoPage from "./pages/ContactoPage";
import FiestasPage from "./pages/FiestasPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import GaleriaPage from "./pages/GaleriaPage";
import EstatuasPage from "./pages/EstatuasPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estatua/:id" element={<StatueDetail />} />
        <Route path="/historia" element={<History />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/estatuas" element={<EstatuasPage />} />
        <Route path="/fiestas" element={<FiestasPage />} />
        <Route path="/galeria" element={<GaleriaPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPanel />
            </RequireAuth>
          }
        />
        <Route path="/acceso" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
