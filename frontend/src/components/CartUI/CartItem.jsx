import { useCart } from "../../context/CardContext";
import { currencyFormatter } from "../../services/formatting";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div className="item">
      <div className="item-inner">
        <div className="img-wrapper">
          <img src={item.image} alt={item.title} height={115} width={115} />
        </div>
        <div className="item-content">
          <div className="delete-cart">
            <img
              src="/delete.svg"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
            />
          </div>

          <div className="item-title">
            <h3>{item.title}</h3>
          </div>

          <div className="item-price">
            <h2>{currencyFormatter.format(item.price)}</h2>
            <div className="cart-quantity">
              <img
                src="/remove.svg"
                onClick={() =>
                  dispatch({ type: "DECREMENT", payload: item.id })
                }
              />
              <span>{item.quantity}</span>
              <img
                src="/add.svg"
                onClick={() =>
                  dispatch({ type: "INCREMENT", payload: item.id })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
