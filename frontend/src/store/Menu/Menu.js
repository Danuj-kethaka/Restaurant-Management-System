import { create } from "zustand";

export const useMenuStore = create((set, get) => ({
  menus: [],

  // ====================== GET MENUS ======================
  getMenus: async () => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/api/menu`);
      const data = await res.json();

      if (data.success) {
        set({ menus: data.data });
      }
    } catch (error) {
      console.error("Failed to fetch menus:", error);
    }
  },

  // ====================== ADD MENU ======================
  addMenu: async (menuData, accessToken) => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append("name", menuData.name);
    formData.append("description", menuData.description);
    formData.append("price", menuData.price);
    formData.append("category", menuData.category);
    if (menuData.image) {
      formData.append("image", menuData.image);
    }

    try {
      const res = await fetch(`${API_URL}/api/menu`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to add menu" };
      }

      // Optimistically update UI
      set((state) => ({
        menus: [data.data, ...state.menus], // newest on top
      }));

      return { success: true, message: "Menu added successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // ====================== UPDATE MENU ======================
  updateMenu: async (id, menuData, accessToken) => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append("name", menuData.name);
    formData.append("description", menuData.description);
    formData.append("price", menuData.price);
    formData.append("category", menuData.category);
    if (menuData.image) {
      formData.append("image", menuData.image);
    }

    try {
      const res = await fetch(`${API_URL}/api/menu/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to update menu" };
      }

      // Update in local state
      set((state) => ({
        menus: state.menus.map((item) =>
          item._id === id ? data.data : item
        ),
      }));

      return { success: true, message: "Menu updated successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // ====================== DELETE MENU ======================
  deleteMenu: async (id, accessToken) => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/api/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Failed to delete menu" };
      }

      // Remove from local state
      set((state) => ({
        menus: state.menus.filter((item) => item._id !== id),
      }));

      return { success: true, message: "Menu deleted successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // ====================== GET SINGLE PRODUCT ======================
  getProduct: (id) => {
    const normalizedId = id?.toString();
    const product = get().menus.find(
      (item) => String(item._id ?? item.id ?? "") === normalizedId
    );

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, data: product };
  },
}));