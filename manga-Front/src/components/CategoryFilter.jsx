import PropTypes from "prop-types";

function CategoryFilter({ onCategoryChange, selectedCategory = "" }) {
  const categories = [
    { id: "391b0423-d847-456f-aff0-8b0cfc03066b", name: "Action" },
    { id: "b9af3a63-f058-46de-a9a0-e0c13906197a", name: "Drama" },
    { id: "4d32cc48-9f00-4cca-9b5a-a839f0764984", name: "Comedy" },
    { id: "ace04997-f6bd-436e-b261-779182193d3d", name: "Fantasy" },
    { id: "5920b825-4181-4a17-beeb-9918b0ff7a30", name: "Adventure" }
  ];

  return (
    <div className="category-filter">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// Ajout de PropTypes pour une meilleure validation
CategoryFilter.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string
};

export default CategoryFilter;
