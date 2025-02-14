import { useState, useEffect } from "react";
import { searchManga, getPopularMangas, getRecentMangas } from "../services/MangApi";
import MangaCard from "../components/MangaCard";
import SearchBar from "../components/searchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";

export default function Home() {
  const [mangas, setMangas] = useState([]);
  const [popularMangas, setPopularMangas] = useState([]);
  const [recentMangas, setRecentMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [popular, recent] = await Promise.all([
        getPopularMangas(),
        getRecentMangas()
      ]);
      setPopularMangas(popular);
      setRecentMangas(recent);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error("Error fetching initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setMangas([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchManga(query);
      setMangas(results);
    } catch (err) {
      setError("Erreur lors de la recherche");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Manga Collec
      </h1>
      
      <SearchBar onSearch={handleSearch} />

      {error && (
        <Toast 
          message={error} 
          type="error" 
          onClose={() => setError(null)} 
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {mangas.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Résultats de recherche</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mangas.map((manga) => (
                  <MangaCard 
                    key={manga.id} 
                    manga={manga}
                    withHover={true}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">🆕</span>
                  Nouveautés
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {recentMangas.map((manga) => (
                    <MangaCard 
                      key={manga.id} 
                      manga={manga}
                      withHover={true}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">🔥</span>
                  Mangas Populaires
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {popularMangas.map((manga) => (
                    <MangaCard 
                      key={manga.id} 
                      manga={manga}
                      withHover={true}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}