import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { FiHome, FiTrendingUp, FiClock, FiSearch } from "react-icons/fi";
=======
import { FiHome, FiTrendingUp, FiClock, FiSearch, FiBook  } from "react-icons/fi";
import { MdLibraryBooks } from "react-icons/md"; 

>>>>>>> 0420fe0dd49d77c2a1ca635ff31bce885f384832

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-900 text-white flex flex-col px-4 py-6">
      {/* Logo du site */}

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3">
        <SidebarLink to="/" icon={<FiHome size={24} />} label="Accueil" />
<<<<<<< HEAD
=======
        <SidebarLink to="/collection" icon={<MdLibraryBooks   size={24} />} label="Collection" />
>>>>>>> 0420fe0dd49d77c2a1ca635ff31bce885f384832
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

<<<<<<< HEAD
  

=======
>>>>>>> 0420fe0dd49d77c2a1ca635ff31bce885f384832
export default Sidebar;
