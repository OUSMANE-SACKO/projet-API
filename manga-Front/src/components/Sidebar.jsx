import { Link } from "react-router-dom";
import { Home, Book, User, LogIn, LogOut } from 'lucide-react';
import useAuthStore from "../Store/auth";

export default function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <div className="sidebar">
      <h2>Manga Collec</h2>
      <nav>
        <Link to="/" className="sidebar-link">
          <Home className="sidebar-icon" />
          <span>Accueil</span>
        </Link>
        {user && (
          <Link to="/collection" className="sidebar-link">
            <Book className="sidebar-icon" />
            <span>Ma Collection</span>
          </Link>
        )}
        {user ? (
          <>
            <div className="sidebar-link">
              <User className="sidebar-icon" />
              <span>{user.username}</span>
            </div>
            <button onClick={logout} className="sidebar-link">
              <LogOut className="sidebar-icon" />
              <span>Déconnexion</span>
            </button>
          </>
        ) : (
          <Link to="/login" className="sidebar-link">
            <LogIn className="sidebar-icon" />
            <span>Connexion</span>
          </Link>
        )}
    <div className="h-screen w-60 bg-gray-900 text-white flex flex-col px-4 py-6">
      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3">
        <SidebarLink to="/" icon={<FiHome size={24} />} label="Accueil" />
        <SidebarLink to="/collection" icon={<FiBook size={24} />} label="Collection" /> {/* Collection ajouté */}
      </nav>
    </div>
  );
}