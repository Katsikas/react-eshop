import { useCart } from "../../context/CardContext";
import { postCartItem } from "../../services/productsApi";

export default function AddToCart({ product }) {
  const { dispatch } = useCart();

  async function handleAddToCart() {
    await postCartItem(product);

    dispatch({ type: "ADD_TO_CART", payload: product });
  }

  return (
    <button className="action-btn" onClick={handleAddToCart}>
      Add to cart
    </button>
  );
}
