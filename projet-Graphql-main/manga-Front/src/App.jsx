import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import MangaDetail from "./Views/MangaDetails";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Sidebar fixée à gauche */}
        <div className="sidebar">
          <Sidebar />
        </div>

        {/* Contenu principal */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
