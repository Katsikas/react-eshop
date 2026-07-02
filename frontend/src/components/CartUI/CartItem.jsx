import { useCart } from "../../context/CardContext";
import { currencyFormatter } from "../../services/formatting";
import { deleteCartItem, patchCartItem } from "../../services/productsApi";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  async function handleQtyAction(method) {
    if (item.quantity === 1 && method === "DECREMENT") {
      try {
        const response = await deleteCartItem(item);

        if (response.status === 204) {
          dispatch({ type: "REMOVE_FROM_CART", payload: item.product });
        }
      } catch (err) {
        console.log(err);
      }

      return;
    }

    try {
      const response = await patchCartItem(item, method);

      if (response.status === 200) {
        dispatch({ type: method, payload: item.product });
      }
    } catch (err) {
      console.log(err);
    }
  }

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
              <button onClick={() => handleQtyAction("DECREMENT")}>
                <img src="/remove.svg" />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQtyAction("INCREMENT")}>
                <img src="/add.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
