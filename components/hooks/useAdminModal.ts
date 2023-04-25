import { create } from "zustand";

interface AdminModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAdminModal = create<AdminModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAdminModal;
