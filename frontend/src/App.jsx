import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import EmptyCartPage from "./pages/EmptyCartPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/empty-cart" element={<EmptyCartPage />} />
    </Routes>
  );
};

export default App;
