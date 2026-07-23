import { create } from "zustand";

export const useFeedbackStore = create((set) => ({
  loading: false,

  submitFeedback: async (feedbackData, accessToken) => {
    set({ loading: true });
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(feedbackData),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return { success: false, message: "Failed to submit feedback" };
    } finally {
      set({ loading: false });
    }
  },

  // Optional: Get all feedback (for Admin)
  getAllFeedback: async (accessToken) => {
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/feedback`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return { success: false, message: "Failed to fetch feedback" };
    }
  },
}));