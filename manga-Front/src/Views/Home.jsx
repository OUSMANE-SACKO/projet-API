import  { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import MangaCard from '../components/MangaCard';
import { searchManga } from '../services/MangApi';

function Home() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await searchManga(query);
      setMangas(data.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>Manga Collection</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="manga-grid">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;