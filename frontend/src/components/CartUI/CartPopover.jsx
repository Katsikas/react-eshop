import { useCart } from "../../context/CardContext";

export default function CartPopover() {
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  const ItemsCount = state.cartItems.length;

  return (
    <div id="cart-popover" popover="auto">
      <strong className="cart-quantity">Your Cart ({ItemsCount})</strong>

      <ul className="order-list">
        {cartItems.map((item) => (
          <li className="cart-item" key={item.id}>
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
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                }
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
