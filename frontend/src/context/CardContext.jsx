import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CartReducer, initialState } from "./CartReducer";
import { fetchCartItems } from "../services/productsApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const data = await fetchCartItems();
        dispatch({ type: "UPDATE_STATE", payload: data });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
