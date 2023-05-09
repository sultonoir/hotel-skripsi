"use client";

import Button from "../shared/Button";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ButtonOutline from "../shared/ButtonOutline";

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
          bg-secondary/70
          backdrop-blur-sm
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
              bg-background
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
                    text-foreground
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold text-foreground">
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
                  flex flex-row gap-4
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <ButtonOutline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
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
