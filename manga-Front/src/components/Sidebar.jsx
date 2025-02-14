import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiTrendingUp, FiClock, FiSearch, FiBook } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-900 text-white flex flex-col px-4 py-6">
      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3">
        <SidebarLink to="/" icon={<FiHome size={24} />} label="Accueil" />
        <SidebarLink to="/collection" icon={<FiBook size={24} />} label="Collection" /> {/* Collection ajouté */}
      </nav>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md transition-all duration-300"
    >
      <div className="mr-4 flex-shrink-0">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
