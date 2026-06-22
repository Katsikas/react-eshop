const Filters = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onClearFilters,
}) => {
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
      </ul>
      {selectedCategory && (
        <button className="clear-btn" onClick={onClearFilters}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Filters;
