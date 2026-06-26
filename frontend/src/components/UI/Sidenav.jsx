import { forwardRef } from "react";

const Sidenav = forwardRef(
  ({ showNav, categories, selectedCategory, onSelect }, ref) => {
    return (
      <aside ref={ref} className={showNav ? "sidenav active" : "sidenav"}>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => onSelect(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
        {selectedCategory && (
          <button className="clear-btn" onClick={() => onSelect(null)}>
            Clear filters
          </button>
        )}
      </aside>
    );
  },
);

export default Sidenav;
