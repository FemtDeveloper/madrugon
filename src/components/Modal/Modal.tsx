"use client";

import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";

import { useModalStore } from "@/stores";

import { CustomButton } from "../Ui";

const Modal = () => {
  const { isModalOpen, modalContent, closeModal } = useModalStore(
    useShallow((state) => ({
      isModalOpen: state.isModalOpen,
      modalContent: state.modalContent,
      closeModal: state.closeModal,
    }))
  );

  return (
    <div
      className={clsx(
        " bg-blur w-dvw h-dvh z-50 top-0 flex flex-col justify-center items-center md:gap-3",
        isModalOpen ? "fixed" : "hidden"
      )}
    >
      <div className=" flex flex-col justify-center items-center md:gap-8 bg-white rounded-2xl p-6 md:p-8 w-full h-full md:w-1/2 md:h-1/3">
        <div className="flex flex-col gap-3 md:gap-4  items-center justify-center">
          <h3 className="h3 font-bold text-primary">{modalContent?.title}</h3>
          <h5 className="text-primary b1">{modalContent?.description}</h5>
        </div>
        <div className="flex gap-4">
          <CustomButton
            btnTitle="Cancelar"
            onClick={closeModal}
            variant="transparent"
            size="small"
          />
          {modalContent && modalContent.onConfirm && (
            <CustomButton
              btnTitle="Continuar"
              onClick={() => {
                modalContent.onConfirm?.();
                closeModal();
              }}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
