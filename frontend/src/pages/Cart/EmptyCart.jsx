import { useNavigate } from "react-router-dom";
import Header from "../../components/UI/Header";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="cart-page empty">
        <div className="breadcrumbs">
          <h4 className="breadcrumbs-link" onClick={() => navigate("/")}>
            Home &gt;
          </h4>
          <h4>Cart</h4>
        </div>
        <div className="empty-cart">
          <h2>Your Cart is empty</h2>
          <button className="action-btn" onClick={() => navigate("/")}>
            Go to Store
          </button>
        </div>
      </div>
    </>
  );
}
