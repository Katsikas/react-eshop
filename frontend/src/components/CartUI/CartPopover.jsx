import { useCart } from "../../context/CardContext";
import { deleteCartItem } from "../../services/productsApi";

export default function CartPopover() {
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  const ItemsCount = state.cartItems.length;

  async function handleRemoveFromCart(item) {
    if (!item.product) {
      dispatch({ type: "REMOVE_FROM_CART", payload: item.product });
      return;
    }

    try {
      const response = await deleteCartItem(item);

      if (response.status === 204) {
        dispatch({ type: "REMOVE_FROM_CART", payload: item.product });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="cart-popover" popover="auto">
      <strong className="cart-quantity">Your Cart ({ItemsCount})</strong>

      <ul className="order-list">
        {cartItems.map((item) => (
          <li className="cart-item" key={item.id ?? item.product}>
            <div className="cell-pic">
              <img src={item.image} alt={item.title} height={45} width={45} />
            </div>
            <div className="cell">
              <p className="item-details">{item.title}</p>
              <p className="quantity">
                quantity: <strong>{item.quantity}</strong>
              </p>
            </div>
            <div className="cell remove-item">
              <button
                aria-label="remove item from cart"
                title="Remove item from cart"
                onClick={() => handleRemoveFromCart(item)}
              >
                <img src="delete.svg" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="bottom-container">
        <a className="action-btn btn-full" href="/cart">
          See your cart
        </a>
      </div>
    </div>
  );
}
