import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer, initialState } from "./CartReducer";
import { fetchCartItems } from "../services/productsApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await fetchCartItems();
        dispatch({ type: "UPDATE_STATE", payload: data });
      } catch (err) {
        console.log(err);
      }
    }

    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
