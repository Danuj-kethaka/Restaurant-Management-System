import { create } from "zustand";

const getItemId = (item) => String(item?._id ?? item?.id ?? "");

export const useCart = create((set, get) => ({
  cart: [],

  addToCart: (product, quantity = 1) => {
    const cart = get().cart;
    const productId = getItemId(product);

    if (!productId) return;

    const existingItem = cart.find((item) => getItemId(item) === productId);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        getItemId(item) === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { ...product, _id: productId, id: productId, quantity }] });
    }
  },

  removeFromCart: (productId) => {
    const normalizedId = String(productId ?? "");
    set({ cart: get().cart.filter((item) => getItemId(item) !== normalizedId) });
  },

  updateQuantity: (productId, newQuantity) => {
    const normalizedId = String(productId ?? "");

    if (newQuantity <= 0) {
      get().removeFromCart(normalizedId);
      return;
    }

    const updatedCart = get().cart.map((item) =>
      getItemId(item) === normalizedId ? { ...item, quantity: newQuantity } : item
    );
    set({ cart: updatedCart });
  },

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    return get().cart.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  },

  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },
}));