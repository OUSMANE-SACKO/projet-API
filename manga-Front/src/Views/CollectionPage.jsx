import { useState, useEffect } from "react";
import { getUserCollection } from "../services/MangApi";
import MangaCard from "../components/MangaCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import useAuthStore from "../Store/auth";

export default function Collection() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchCollection();
    }
  }, []);

  const fetchCollection = async () => {
    try {
      setLoading(true);
      const userCollection = await getUserCollection();
      setCollection(userCollection);
    } catch (err) {
      setError("Erreur lors du chargement de votre collection");
      console.error("Error fetching collection:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
        <p>Veuillez vous connecter pour accéder à votre collection.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Ma Collection
      </h1>

      {error && (
        <Toast 
          message={error} 
          type="error" 
          onClose={() => setError(null)} 
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : collection.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Votre collection est vide.</p>
          <p className="text-gray-500">
            Commencez à ajouter des mangas depuis la page d'accueil !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collection.map((manga) => (
            <MangaCard 
              key={manga.id} 
              manga={manga} 
              inCollection={true}
              onRemove={fetchCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
}