import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import MangaDetail from "./Views/MangaDetails";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Collection from "./Views/CollectionPage";
import Sidebar from "./components/Sidebar";
import useAuthStore from "./Store/auth";
import "./App.css";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manga/:id" element={<MangaDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user && <Route path="/collection" element={<Collection />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;