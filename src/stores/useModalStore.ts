import { create } from "zustand";

interface ModalContentProps {
  title: string;
  description: string;
}

interface ModalProps {
  isModalOpen: boolean;
  modalContent: ModalContentProps | null;
  openModal: (content: ModalContentProps) => void;
  closeModal: () => void;
  variant: "success" | "warning" | "error";
}

export const useModalStore = create<ModalProps>((set) => ({
  isModalOpen: false,
  modalContent: null,
  variant: "success",
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false }),
}));
