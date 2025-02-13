// CollectionPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MangaCard from "../components/MangaCard";
import useAuthStore from "../store/auth";

function CollectionPage() {
  const [activeTab, setActiveTab] = useState("collection");
  const [collection, setCollection] = useState([]);
  const [completer, setCompleter] = useState([]);
  const [envie, setEnvie] = useState([]);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const fetchCollections = () => {
    console.log("Fetching collections..."); // Ajout de logs pour déboguer
    setCollection(JSON.parse(localStorage.getItem("mangaCollection")) || []);
    setCompleter(JSON.parse(localStorage.getItem("mangaCompleter")) || []);
    setEnvie(JSON.parse(localStorage.getItem("mangaEnvie")) || []);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    fetchCollections();
  }, [user]);

  useEffect(() => {
    console.log("Active Tab Changed:", activeTab); // Vérifier l'état du tab
    fetchCollections();
  }, [activeTab]); // Ajout d'une dépendance pour mettre à jour les collections lors du changement d'onglet

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const removeFromCategory = (id, category) => {
    let updatedList;
    if (category === "collection") {
      updatedList = collection.filter(manga => manga.id !== id);
      setCollection(updatedList);
      localStorage.setItem("mangaCollection", JSON.stringify(updatedList));
    } else if (category === "completer") {
      updatedList = completer.filter(manga => manga.id !== id);
      setCompleter(updatedList);
      localStorage.setItem("mangaCompleter", JSON.stringify(updatedList));
    } else if (category === "envie") {
      updatedList = envie.filter(manga => manga.id !== id);
      setEnvie(updatedList);
      localStorage.setItem("mangaEnvie", JSON.stringify(updatedList));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Bienvenue !</h2>
          <p className="text-gray-600 mb-6">Connectez-vous ou inscrivez-vous pour accéder à votre collection de mangas.</p>
          <div className="space-y-4">
            <button 
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => navigate("/login")}
            >
              Se connecter
            </button>
            <button 
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => navigate("/register")}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Ma Collection</h1>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => handleTabChange("collection")}
          className={`px-4 py-2 rounded ${activeTab === "collection" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Collection
        </button>
        <button
          onClick={() => handleTabChange("completer")}
          className={`px-4 py-2 rounded ${activeTab === "completer" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Compléter
        </button>
        <button
          onClick={() => handleTabChange("envie")}
          className={`px-4 py-2 rounded ${activeTab === "envie" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Envie
        </button>
      </div>

      {activeTab === "collection" && (
        <MangaList mangas={collection} removeFromCategory={removeFromCategory} category="collection" />
      )}
      {activeTab === "completer" && (
        <MangaList mangas={completer} removeFromCategory={removeFromCategory} category="completer" />
      )}
      {activeTab === "envie" && (
        <MangaList mangas={envie} removeFromCategory={removeFromCategory} category="envie" />
      )}
    </div>
  );
}

const MangaList = ({ mangas, removeFromCategory, category }) => (
  mangas.length === 0 ? (
    <p className="text-gray-500">Aucun manga dans cette catégorie.</p>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mangas.map((manga) => (
        <div key={manga.id} className="relative">
          <MangaCard manga={manga} />
          <button 
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => removeFromCategory(manga.id, category)}
          >
            Retirer
          </button>
        </div>
      ))}
    </div>
  )
);

export default CollectionPage;
