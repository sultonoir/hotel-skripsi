"use client";

import Button from "../Button";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          
        "
      >
        <div
          className="
          relative 
          w-full
          max-w-sm
          mx-auto 
          h-screen
          lg:h-auto
          md:h-auto
          "
        >
          {/*content*/}
          <div
            className={`
            translate
            duration-300
            h-screen
            md:h-auto
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white
              outline-none 
              focus:outline-none
              p-2
            "
            >
              {/*header*/}
              <div
                className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                "
              >
                <button
                  aria-label="submit"
                  className="
                    btn
                    btn-ghost
                    rounded-full
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose
                    size={18}
                    color="black"
                  />
                </button>
                <div className="text-lg font-semibold text-neutral-800">
                  {title}
                </div>
              </div>
              <hr />
              {/*body*/}
              <div className="relative p-6 flex-auto">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 px-6 py-2">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                <div className="mt-2">{footer}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;