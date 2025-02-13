import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un manga..."
        className="px-4 py-2 border rounded-l-lg w-1/2 text-lg"
      />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600">
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;
