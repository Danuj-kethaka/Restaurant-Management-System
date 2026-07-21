import { create } from "zustand";

export const useMenuStore = create((set, get) => ({
  menus: [],

  addMenu: async (menuData, accessToken) => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    const formData = new FormData();

    formData.append("name", menuData.name);
    formData.append("description", menuData.description);
    formData.append("price", menuData.price);
    formData.append("category", menuData.category);
    formData.append("image", menuData.image);

    const res = await fetch(`${API_URL}/api/menu`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }

    set((state) => ({
      menus: [...state.menus, data.data],
    }));

    return {
      success: true,
      message: "Menu added successfully",
    };
  },

  getMenus: async () => {

    const API_URL = import.meta.env.DEV
        ? ""
        : import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/api/menu`);

    const data = await res.json();

    if (data.success) {

        set({
            menus: data.data
        });

    }

  },

getProduct: (id) => {
  const normalizedId = id?.toString();
  const product = get().menus.find((item) => String(item._id ?? item.id ?? "") === normalizedId);

  if (!product) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  return {
    success: true,
    data: product,
  };
},


}));