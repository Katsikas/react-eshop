const Filters = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="filters-con">
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              className={selectedCategory === category ? "active" : ""}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          </li>
        ))}
        {selectedCategory && (
          <li>
            <button
              className="clear-btn"
              onClick={() => onCategorySelect(null)}
            >
              Clear
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Filters;
