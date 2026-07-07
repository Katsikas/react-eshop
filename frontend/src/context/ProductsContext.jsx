import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../services/productsApi";

const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
  loading: false,
  error: null,
});

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProductsAndCategories() {
      setLoading(true);

      try {
        const productsData = await fetchProducts();

        setProducts(productsData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getProductsAndCategories();
  }, []);

  const ctxValue = {
    products,
    setProducts,
    loading,
    error,
  };

  return <ProductsContext value={ctxValue}>{children}</ProductsContext>;
}

export default ProductsContext;
