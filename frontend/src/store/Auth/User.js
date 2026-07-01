import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: [],
  currentUser: null,
  accessToken: null,

  setUser: (user) => set({ user }),

  setAuth: (user, token) =>
    set({
      currentUser: user,
      accessToken: token,
    }),

  logout: () =>
    set({
      currentUser: null,
      accessToken: null,
    }),

  // CREATE USER
  createUser: async (newUser) => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      user: [...state.user, data.data],
    }));

    return {
      success: true,
      message: "Account created successfully",
    };
  },

  // LOGIN 
  signInUser: async ({ email, password }) => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      set({
        currentUser: data.user,
        accessToken: data.accessToken,
      });

      return {
        success: true,
        user: data.user,
      };
    }

    return {
      success: false,
      message: data.message,
    };
  },

  // AUTO REFRESH TOKEN 
  refreshToken: async () => {
    const API_URL = import.meta.env.DEV
      ? ""
      : import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/api/users/refesh`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      set({ accessToken: data.accessToken });
      return data.accessToken;
    }

    set({ currentUser: null, accessToken: null });
    return null;
  },

  // LOGOUT (UPDATED)
  signOutUser: () => {
    set({
      currentUser: null,
      accessToken: null,
    });

    return {
      success: true,
      message: "Logout successfully",
    };
  },
}));