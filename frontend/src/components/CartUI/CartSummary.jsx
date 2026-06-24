import { useState } from "react";
import { useCart } from "../../context/CardContext";
import { currencyFormatter } from "../../services/formatting";

export default function CartSummary() {
  const [agreed, setAgreed] = useState(false);
  const { state } = useCart();
  const { cartItems } = state;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = subTotal * 0.2;
  const deliveryFee = 15;

  const total = subTotal - discount + deliveryFee;

  return (
    <div className="summary-inner">
      <h2>Order Summary</h2>
      <div className="sums">
        <div className="sub-total">
          <p>Subtotal</p>
          <p>{currencyFormatter.format(subTotal)}</p>
        </div>

        <div className="total-items">
          <p>Total Items</p>
          <p>{currencyFormatter.format(totalItems)}</p>
        </div>

        <div className="discount">
          <p>Discount (-20%)</p>
          <p>{currencyFormatter.format(discount)}</p>
        </div>

        <div className="delivery-fee">
          <p>Delivery Fee</p>
          <p>{currencyFormatter.format(deliveryFee)}</p>
        </div>
      </div>

      <div className="total">
        <p>Total</p>
        <p>{currencyFormatter.format(total)}</p>
      </div>
      <div className="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="terms">I agree with the Terms and Conditions</label>
      </div>

      <button
        className={agreed ? "action-btn" : "action-btn disabled"}
        disabled={!agreed}
      >
        Go to Checkout
      </button>
    </div>
  );
}
