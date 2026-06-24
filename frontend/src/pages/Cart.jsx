import CartSummary from "../components/CartUI/CartSummary";
import { useCart } from "../context/CardContext";
import { useNavigate, Navigate } from "react-router-dom";
import CartItem from "../components/CartUI/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const { cartItems } = state;

  if (cartItems.length === 0) return <Navigate to="/empty-cart" />;

  return (
    <div className="cart-page">
      <div>
        <div className="breadcrumbs">
          <h4 className="breadcrumbs-link" onClick={() => navigate("/")}>
            Home &gt;
          </h4>
          <h4>Cart</h4>
        </div>
        <h1>Your Cart</h1>
      </div>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-summary">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
