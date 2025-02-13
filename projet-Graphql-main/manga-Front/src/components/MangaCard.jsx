import { Link } from "react-router-dom";

function MangaCard({ manga }) {
  const coverUrl = manga.attributes.cover
    ? `https://uploads.mangadex.org/covers/${manga.id}/${manga.attributes.cover}.256.jpg`
    : "https://via.placeholder.com/150"; // Image par défaut

  return (
    <div className="manga-list-item flex items-center space-x-4 mb-6">
      <Link to={`/manga/${manga.id}`} className="flex items-center w-full">
        <img
          src={coverUrl}
          alt={manga.attributes.title}
          className="w-32 h-48 object-cover rounded-md"
        />
        <div className="ml-4"> {/* Ajoute de l'espace à gauche de l'image */}
          <h3 className="text-xl font-semibold text-center">{manga.attributes.title}</h3> {/* Centrer le titre */}
          <p className="text-gray-600 text-sm mt-2">
            {manga.attributes.description.substring(0, 100)}...
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MangaCard;
