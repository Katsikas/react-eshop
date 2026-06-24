import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import EmptyCartPage from "./pages/EmptyCartPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/empty-cart" element={<EmptyCartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
