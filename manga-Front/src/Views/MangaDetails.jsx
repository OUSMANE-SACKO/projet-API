import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMangaDetails } from '../services/MangApi';

function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const data = await getMangaDetails(id);
        setManga(data.data);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!manga) return <p>Manga not found</p>;

  return (
    <div className="manga-detail">
      <h1>{manga.attributes.title.en}</h1>
      <p>{manga.attributes.description.en}</p>
      <div className="manga-info">
        <p>Status: {manga.attributes.status}</p>
        <p>Publication: {manga.attributes.year}</p>
      </div>
    </div>
  );
}

export default MangaDetail;