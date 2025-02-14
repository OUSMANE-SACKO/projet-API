import { Link } from "react-router-dom";
import useAuthStore from "../Store/auth";
import { addToCollection, removeFromCollection } from "../services/MangApi";

export default function MangaCard({ manga, inCollection }) {
  const user = useAuthStore((state) => state.user);

  const handleCollectionToggle = async () => {
    try {
      if (inCollection) {
        await removeFromCollection(manga.id);
      } else {
        await addToCollection(manga.id);
      }
      // Vous devriez probablement mettre à jour l'état local ou global ici
    } catch (error) {
      console.error("Error toggling collection status:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/manga/${manga.id}`}>
        <img src={manga.coverImage || "/placeholder.svg"} alt={manga.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{manga.title}</h3>
        
        <p className="text-sm text-gray-600 mb-4">{manga.description.slice(0, 100)}...</p>
        {user && (
          <button
            onClick={handleCollectionToggle}
            className={`px-4 py-2 rounded ${
              inCollection
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors`}
          >
            {inCollection ? "Retirer" : "Ajouter"}
          </button>
        )}
      </div>
    </div>
  );
}