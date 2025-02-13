import  { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import MangaCard from '../components/MangaCard';
import CategoryFilter from '../components/CategoryFilter';
import { searchManga, getDefaultManga, getMangaByCategory } from '../services/MangApi';

function Home() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadDefaultManga();
  }, []);

  const loadDefaultManga = async () => {
    setLoading(true);
    try {
      const data = await getDefaultManga();
      setMangas(data.data);
    } catch (error) {
      console.error('Error loading default manga:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    try {
      if (categoryId) {
        const data = await getMangaByCategory(categoryId);
        setMangas(data.data);
      } else {
        await loadDefaultManga();
      }
    } catch (error) {
      console.error('Category filter error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>Manga Collection</h1>
      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter 
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>
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