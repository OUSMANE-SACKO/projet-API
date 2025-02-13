import { Link } from "react-router-dom";
import useAuthStore from "../Store/auth";

function MangaCard({ manga }) {
  const { user } = useAuthStore((state) => state);
  const coverUrl = manga.attributes.cover
    ? `https://uploads.mangadex.org/covers/${manga.id}/${manga.attributes.cover}.256.jpg`
    : "https://via.placeholder.com/150"; // Image par défaut

  // Fonction pour ajouter un manga à la collection
  const handleAddToCollection = () => {
    if (user) {
      const existingCollection = JSON.parse(localStorage.getItem("mangaCollection")) || [];
      if (!existingCollection.some((item) => item.id === manga.id)) {
        const updatedCollection = [...existingCollection, manga];
        localStorage.setItem("mangaCollection", JSON.stringify(updatedCollection));
        alert("Manga ajouté à la collection !");
      } else {
        alert("Ce manga est déjà dans votre collection.");
      }
    } else {
      alert("Vous devez être connecté pour ajouter ce manga à votre collection.");
    }
  };

  // Fonction pour ajouter un manga à la liste d'envie
  const handleAddToEnvie = () => {
    if (user) {
      const existingEnvie = JSON.parse(localStorage.getItem("mangaEnvie")) || [];
      if (!existingEnvie.some((item) => item.id === manga.id)) {
        const updatedEnvie = [...existingEnvie, manga];
        localStorage.setItem("mangaEnvie", JSON.stringify(updatedEnvie));
        alert("Manga ajouté à la liste d'envie !");
      } else {
        alert("Ce manga est déjà dans votre liste d'envie.");
      }
    } else {
      alert("Vous devez être connecté pour ajouter ce manga à votre liste d'envie.");
    }
  };

  return (
    <div className="manga-list-item flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md mb-6">
      <Link to={`/manga/${manga.id}`} className="flex flex-col items-center">
        <img
          src={coverUrl}
          alt={manga.attributes.title}
          className="w-32 h-48 object-cover rounded-md mb-4"
        />
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">{manga.attributes.title}</h3>
          <p className="text-gray-600 text-sm mt-2">
            {manga.attributes.description.substring(0, 100)}...
          </p>
        </div>
      </Link>

      {user && (
        <div className="flex flex-col items-center justify-center w-full mt-4 space-y-10">
          <button
            onClick={handleAddToCollection}
            className="w-3/4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Ajouter à la collection
          </button>
          <button
            onClick={handleAddToEnvie}
            className="w-3/4 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
          >
            Ajouter à la liste d'envie
          </button>
        </div>
      )}
    </div>
  );
}

export default MangaCard;
