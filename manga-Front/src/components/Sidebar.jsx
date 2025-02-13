import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiTrendingUp, FiClock, FiSearch } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-900 text-white flex flex-col px-4 py-6">
      {/* Logo du site */}

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3">
        <SidebarLink to="/" icon={<FiHome size={24} />} label="Accueil" />
        <SidebarLink to="/popular" icon={<FiTrendingUp size={24} />} label="Populaires" />
        <SidebarLink to="/recent" icon={<FiClock size={24} />} label="Nouveautés" />
        <SidebarLink to="/search" icon={<FiSearch size={24} />} label="Rechercher" />
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