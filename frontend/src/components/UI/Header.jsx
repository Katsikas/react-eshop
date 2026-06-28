import { useEffect, useRef, useState } from "react";
import Sidenav from "./Sidenav";
import { useCart } from "../../context/CardContext";
import { Link, NavLink } from "react-router-dom";

const Header = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onClearFilters,
}) => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef();
  const { state } = useCart();

  const ItemsCount = state.cartItems.length;

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
              className="logo img-transition"
              alt="logo"
            />
          </Link>
          <ul className="navbar-links">
            <li>
              <NavLink to="/"> Home</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
          </ul>

          <div className="navbar-actions">
            <div
              className={`cart-icon ${ItemsCount ? "has-items" : ""}`}
              data-items={ItemsCount}
            >
              <Link to={"/cart"}>
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
                <img
                  src="/burger.svg"
                  alt="search"
                  className="img-transition"
                />
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

export default Header;
