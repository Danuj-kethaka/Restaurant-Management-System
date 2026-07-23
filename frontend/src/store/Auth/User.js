import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      accessToken: null,

      setAuth: (user, token) => {
        set({
          currentUser: user,
          accessToken: token,
        });
      },

      createUser: async ({ name, email, password }) => {
        const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

        try {
          const res = await fetch(`${API_URL}/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
          });

          const data = await res.json();

          if (res.ok && data.success) {
            return { 
              success: true, 
              message: data.message || "Account created successfully" 
            };
          } else {
            return { 
              success: false, 
              message: data.message || "Registration failed" 
            };
          }
        } catch (error) {
          console.error("Register error:", error);
          return { 
            success: false, 
            message: "Network error. Please check your connection." 
          };
        }
      },

      signInUser: async ({ email, password }) => {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      try {
        const res = await fetch(`${API_URL}/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.success) {
          // Save to store
          set({
            currentUser: data.user,
            accessToken: data.accessToken,
          });

          return { success: true, user: data.user, accessToken: data.accessToken };
        }

        return { success: false, message: data.message };
      } catch (error) {
        return { success: false, message: "Login failed" };
      }
    },

      logout: () => {
        set({ currentUser: null, accessToken: null });
        // Clear localStorage manually
        localStorage.removeItem("user-storage");
      },

      // Optional: Refresh Token
      refreshToken: async () => {
        const API_URL = import.meta.env.DEV
          ? ""
          : import.meta.env.VITE_API_URL;

        try {
          const res = await fetch(`${API_URL}/api/users/refesh`, {
            method: "POST",
            credentials: "include",
          });

          const data = await res.json();

          if (data.success) {
            set({ accessToken: data.accessToken });
            return data.accessToken;
          }
        } catch (error) {}

        get().logout();
        return null;
      },
    }),

    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        accessToken: state.accessToken,
      }),
    }
  )
);