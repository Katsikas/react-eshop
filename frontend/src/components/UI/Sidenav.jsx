import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CardContext";

const Sidenav = forwardRef(
  ({ showNav, categories, selectedCategory, onSelect }, ref) => {
    const { state } = useCart();
    const ItemsCount = state.cartItems.length;

    return (
      <aside ref={ref} className={showNav ? "sidenav active" : "sidenav"}>
        <div>
          <h4>Categories</h4>
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
        </div>
        <h4>
          <Link to="/cart"> Cart ({ItemsCount})</Link>
        </h4>
        <h4>
          <Link to="/favorites">Favorites</Link>
        </h4>
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
