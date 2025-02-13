import { useState, useEffect } from "react";
import MangaCard from "../components/MangaCard";

function Collection() {
  const [activeTab, setActiveTab] = useState("collection");
  const [collection, setCollection] = useState([]);
  const [completer, setCompleter] = useState([]);
  const [envie, setEnvie] = useState([]);

  // Charger les données depuis localStorage
  useEffect(() => {
    setCollection(JSON.parse(localStorage.getItem("mangaCollection")) || []);
    setCompleter(JSON.parse(localStorage.getItem("mangaCompleter")) || []);
    setEnvie(JSON.parse(localStorage.getItem("mangaEnvie")) || []);
  }, []);

  // Supprimer un manga d'une catégorie
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Ma Collection</h1>
      
      {/* Onglets */}
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab("collection")} className={`px-4 py-2 rounded ${activeTab === "collection" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Collection</button>
        <button onClick={() => setActiveTab("completer")} className={`px-4 py-2 rounded ${activeTab === "completer" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Compléter</button>
        <button onClick={() => setActiveTab("envie")} className={`px-4 py-2 rounded ${activeTab === "envie" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Envie</button>
      </div>

      {/* Affichage des mangas selon l'onglet actif */}
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

export default Collection;