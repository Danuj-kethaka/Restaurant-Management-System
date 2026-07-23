import { create } from "zustand";

export const useReservationStore = create((set, get) => ({
  reservations: [],
  loading: false,

  createReservation: async (reservationData, accessToken) => {
    set({ loading: true });
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return { success: false, message: "Failed to create reservation" };
    } finally {
      set({ loading: false });
    }
  },

  getMyReservations: async (accessToken) => {
    set({ loading: true });
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/reservations/myreservations`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (data.success) {
        set({ myReservations: data.data });
      }
      return data;
    } catch (error) {
      return { success: false, message: "Failed to load reservations" };
    } finally {
      set({ loading: false });
    }
  },

  // For Admin - Get All Reservations
  getAllReservations: async (accessToken) => {
    set({ loading: true });
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/reservations`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (data.success) {
        set({ reservations: data.data });
      }
      return data;
    } catch (error) {
      return { success: false, message: "Failed to fetch reservations" };
    } finally {
      set({ loading: false });
    }
  },

  // Update Reservation Status (Admin)
  updateReservationStatus: async (id, status, accessToken) => {
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/reservations/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });

      return await res.json();
    } catch (error) {
      return { success: false, message: "Failed to update status" };
    }
  },
}));