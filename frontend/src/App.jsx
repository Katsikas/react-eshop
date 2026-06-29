import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import EmptyCartPage from "./pages/EmptyCartPage";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Category/Categories";
import Category from "./pages/Category/Category";
import Header from "./components/UI/Header";
import { ProductsContextProvider } from "./context/ProductsContext";

const App = () => {
  return (
    <ProductsContextProvider>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/empty-cart" element={<EmptyCartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProductsContextProvider>
  );
};

export default App;
