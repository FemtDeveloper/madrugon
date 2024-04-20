"use client";
import { useModalStore } from "@/stores";
import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";

const Modal = () => {
  const { isModalOpen, modalContent } = useModalStore(
    useShallow((state) => ({
      isModalOpen: state.isModalOpen,
      modalContent: state.modalContent,
    }))
  );

  return (
    <div
      className={clsx(
        " bg-blur w-dvw h-dvh z-50 top-0 flex ",
        isModalOpen ? "fixed" : "hidden"
      )}
    >
      <div className="h-full flex flex-col gap-3  items-center justify-center md:gap-6 w-full md:h-1/2 md:w-1/2 bg-white rounded-2xl">
        <h3 className="h3 font-bold text-primary">{modalContent?.title}</h3>
        <h5 className="text-primary">{modalContent?.description}</h5>
      </div>
    </div>
  );
};

export default Modal;
