import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  user: null | { id: string; name: string };
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: any) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      isMobileMenuOpen: false,
      isLoading: false,
      user: null,
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setLoading: (loading) => set({ isLoading: loading }),
      setUser: (user) => set({ user }),
    }),
    { name: "app-store" }
  )
);
