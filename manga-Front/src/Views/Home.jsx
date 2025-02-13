import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
import MangaCard from "../components/MangaCard";
import { searchManga, getPopularMangas, getRecentMangas } from "../services/MangApi";
import useAuthStore from "../store/auth"; // Assurez-vous que votre store d'authentification est correctement importé

function Home() {
  const { user } = useAuthStore((state) => state); // Récupérer l'utilisateur du store d'authentification
  const [mangas, setMangas] = useState([]);
  const [popularMangas, setPopularMangas] = useState([]);
  const [recentMangas, setRecentMangas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMangas = async () => {
      setLoading(true);
      try {
        const popular = await getPopularMangas();
        const recent = await getRecentMangas();

        setPopularMangas(popular.data.map(manga => ({
          id: manga.id,
          attributes: {
            title: manga.attributes.title.en || "Titre inconnu",
            description: manga.attributes.description.en || "Aucune description",
            cover: manga.relationships.find(rel => rel.type === "cover_art")?.attributes?.fileName || null
          }
        })));

        setRecentMangas(recent.data.map(manga => ({
          id: manga.id,
          attributes: {
            title: manga.attributes.title.en || "Titre inconnu",
            description: manga.attributes.description.en || "Aucune description",
            cover: manga.relationships.find(rel => rel.type === "cover_art")?.attributes?.fileName || null
          }
        })));

      } catch (error) {
        console.error("Error fetching mangas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMangas();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await searchManga(query);
      setMangas(data.data.map(manga => ({
        id: manga.id,
        attributes: {
          title: manga.attributes.title.en || "Titre inconnu",
          description: manga.attributes.description.en || "Aucune description",
          cover: manga.relationships.find(rel => rel.type === "cover_art")?.attributes?.fileName || null
        }
      })));
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Manga Collec</h1>
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="text-center">Loading...</p>}

        {mangas.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 justify-items-center">
            {mangas.map((manga) => (
              <MangaCard key={manga.id} manga={manga} user={user} />
            ))}
          </div>
        ) : (
          <>
            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Nouveautés</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {recentMangas.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} user={user} /> 
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Mangas Populaires</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {popularMangas.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} user={user} /> 
                ))}
              </div>
            </section>
          </>
        )}

        {/* Exemple de bouton ici */}
        <button className="mt-8">Voir Plus</button>
      </div>
    </div>
  );
}

export default Home;
