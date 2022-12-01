import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsInCart: [],
    isCartLoaded: false,
    cartTotal: 0,
  },
  reducers: {
    loadCart: (state: any) => {
      const cartFromStorage = JSON.parse(localStorage.getItem("cart")!);

      if (cartFromStorage) {
        state.itemsInCart = cartFromStorage;
        state.isCartLoaded = true;
      } else {
        state.isCartLoaded = true;
      }
    },

    addToCart: (state: any, action: any) => {
      const product = structuredClone({
        ...action.payload.product,
        currentVariant: action.payload.variant,
      });

      const variant = action.payload.variant;
      const _id = action.payload.variant._id;
      const quantity = action.payload.quantity;
      const cart = structuredClone(action.payload.cart);

      const exists = current(state).itemsInCart.some(
        (item: any): boolean => item.currentVariant._id == variant._id
      );

      if (exists) {
        // Check if array quantity is being 0 (aka removed)
        if (quantity === "0") {
          // Get array without the specific element so we can remove
          const newItems = cart.filter(
            (item: any): any => item.currentVariant._id !== _id
          );

          // Reassign items under cart state
          state.itemsInCart = newItems;

          // Reassign cart under localStorage
          localStorage.setItem("cart", JSON.stringify(newItems));
        } else {
          // Find desired item
          const item = cart.find(
            (item: any): any => item.currentVariant._id === _id
          );

          // Update quantity of item
          item.quantity = quantity;

          // Updating specific item
          cart[item] = item;

          // Reassign items under cart state
          state.itemsInCart = cart;

          // Reassign cart under localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } else {
        // Assign quantity under given product
        product.quantity = quantity;

        // Grab all items under cart
        const newItems = state.itemsInCart;

        // Create a new array with these props
        const items = [...newItems, product];

        // Assign items under cart state
        state.itemsInCart = items;

        // Assign cart under localStorage
        localStorage.setItem("cart", JSON.stringify(items));
      }
    },

    removeFromCart: (state: any, action: any) => {
      const variant = action.payload.variant;

      const newCart = state.itemsInCart
        .filter((item: any) => item.currentVariant._id !== variant._id)
        .sort();

      state.itemsInCart = newCart;
      localStorage.setItem("cart", JSON.stringify(newCart));
    },

    clearCart: (state: any) => {
      state.itemsInCart = [];
      localStorage.removeItem("cart");
      state.cartTotal = 0;
    },
  },
});

export const { loadCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
