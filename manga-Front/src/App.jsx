import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import MangaDetail from "./Views/MangaDetails";
import Sidebar from "./components/Sidebar";
import Login from "./Views/Login";
import Register from "./Views/Register";
import CollectionPage from "./Views/CollectionPage"; // Importer la CollectionPage
import useAuthStore from "./Store/auth";
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Route pour la page Collection */}
            <Route path="/collection" element={<CollectionPage />} />
            {/* Protéger certaines routes */}
            {user && <Route path="/dashboard" element={<h1>Tableau de Bord</h1>} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
