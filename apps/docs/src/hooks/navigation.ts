import { create } from "zustand"

interface NavigationStore {
  showNavigation: boolean
  toggleNavigation: () => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  showNavigation: false,
  toggleNavigation: () =>
    set((state) => ({ showNavigation: !state.showNavigation })),
}))
