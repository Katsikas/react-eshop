import AddToFavorites from "./UI/Addtofavorites";
import { useCart } from "../context/CardContext";
import { currencyFormatter } from "../services/formatting";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <AddToFavorites />
        <img
          src={product.image}
          height={145}
          width={145}
          loading="lazy"
          alt={product.title}
        />
      </div>
      <div className="product-details">
        <div className="upper-part">
          <h3>{product.title}</h3>
          {product.categories.map((cat) => (
            <p key={cat.id} className="category">
              {cat.cat_name.toUpperCase()}
            </p>
          ))}
        </div>

        <div className="lower-part">
          <p className="price">{currencyFormatter.format(product.price)}</p>
          <div className="add-to-cart">
            <button className="action-btn" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
