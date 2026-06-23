import { useEffect, useRef, useState } from "react";
import Sidenav from "./Sidenav";
import { useCart } from "../context/CardContext";
import { Link } from "react-router-dom";

const NavBar = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onClearFilters,
}) => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef();
  const { state } = useCart();

  const totalItems = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header>
        <nav>
          <Link to="/">
            <img
              src="/heart_white.svg"
              height={25}
              width={25}
              className="logo"
              alt="logo"
            />
          </Link>
          <ul className="navbar-links">
            <li>**</li>
            <li>**</li>
            <li>**</li>
          </ul>

          <div className="navbar-actions">
            <div className="cart-icon">
              <Link to={"/cart"}>
                {totalItems > 0 && <span>{totalItems}</span>}
                <img src="/shopping.svg" height={22} width={22} alt="cart" />
              </Link>
            </div>
            {categories && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNav((v) => !v);
                }}
              >
                <img src="/burger.svg" alt="search" />
              </button>
            )}
          </div>
        </nav>
      </header>
      {categories && (
        <Sidenav
          ref={navRef}
          showNav={showNav}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={onCategorySelect}
          onClear={onClearFilters}
        />
      )}
    </div>
  );
};

export default NavBar;
