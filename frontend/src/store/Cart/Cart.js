import { create } from "zustand";

export const useCart = create((set, get) => ({
  cart: [],



  // Add Item to Cart
  addToCart: (product, quantity = 1) => {
    const cart = get().cart;
    
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      set({ cart: updatedCart });
    } else {
      // If it's new, add it with the specified quantity
      set({ cart: [...cart, { ...product, quantity }] });
    }
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item._id !== productId) });
  },
	
updateQuantity: (productId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const updatedCart = get().cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    set({ cart: updatedCart });
  },
clearCart: () => set({ cart: [] }),


  getCartTotal: () => {
    return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

}));