import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import MangaDetail from "./Views/MangaDetails";
import Sidebar from "./components/Sidebar";
import Collection from "./Views/Collection"; // Assure-toi que ce chemin est correct
import Login from "./Views/Login";
import Register from "./Views/Register";
import useAuthStore from "./store/auth";
import "./App.css";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className="app">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
            {/* Ajoute la route pour la page Collection */}
            <Route path="/collection" element={<Collection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protéger certaines routes */}
            {user && <Route path="/dashboard" element={<h1>Tableau de Bord</h1>} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
