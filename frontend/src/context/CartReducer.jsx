export const initialState = {
  cartItems: [],
};

export function CartReducer(state, action) {
  switch (action.type) {
    case "UPDATE_STATE": {
      const items = action.payload;

      return { ...state, cartItems: items };
    }

    case "ADD_TO_CART": {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.id,
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      };
    }

    case "INCREMENT": {
      const id = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    }

    case "DECREMENT": {
      const id = action.payload;

      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.product === id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case "REMOVE_FROM_CART": {
      const id = action.payload;

      console.log(id);

      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== id),
      };
    }

    default:
      return state;
  }
}
