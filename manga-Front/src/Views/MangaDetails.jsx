import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMangaDetails, addToCollection, removeFromCollection } from '../services/MangApi';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import useAuthStore from '../Store/auth';

export default function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    fetchMangaDetails();
  }, [id]);

  const fetchMangaDetails = async () => {
    try {
      setLoading(true);
      const data = await getMangaDetails(id);
      setManga(data);
    } catch (err) {
      setError("Erreur lors du chargement des détails du manga");
      console.error('Error fetching manga details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionAction = async (action) => {
    if (!isAuthenticated()) {
      setToast({
        message: "Veuillez vous connecter pour gérer votre collection",
        type: "error"
      });
      return;
    }

    try {
      if (action === 'add') {
        await addToCollection(id);
        setToast({
          message: "Manga ajouté à votre collection",
          type: "success"
        });
      } else {
        await removeFromCollection(id);
        setToast({
          message: "Manga retiré de votre collection",
          type: "success"
        });
      }
    } catch (err) {
      setToast({
        message: "Une erreur est survenue",
        type: "error"
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!manga) return <div className="text-center">Manga non trouvé</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={manga.coverImage || "/placeholder.jpg"}
              alt={manga.title}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{manga.title}</h1>
              {isAuthenticated() && (
                <button
                  onClick={() => handleCollectionAction(manga.inCollection ? 'remove' : 'add')}
                  className={`px-4 py-2 rounded-md text-white ${
                    manga.inCollection
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {manga.inCollection ? 'Retirer' : 'Ajouter'}
                </button>
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{manga.description}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Informations</h2>
                <ul className="space-y-2">
                  <li><strong>Statut:</strong> {manga.status}</li>
                  <li><strong>Année:</strong> {manga.year}</li>
                  <li><strong>Genres:</strong> {manga.genres.join(', ')}</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Chapitres</h2>
                <div className="max-h-48 overflow-y-auto">
                  <ul className="space-y-2">
                    {manga.chapters.map((chapter) => (
                      <li key={chapter.id} className="text-gray-600">
                        {chapter.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}