import { Link } from 'react-router-dom';

function MangaCard({ manga }) {
  return (
    <div className="manga-card">
      <Link to={`/manga/${manga.id}`}>
        <h3>{manga.attributes.title.en}</h3>
        <p>{manga.attributes.description.en?.substring(0, 150)}...</p>
      </Link>
    </div>
  );
}

export default MangaCard;