"use client";
import { useState, useEffect, cloneElement } from "react";
import { createPortal } from "react-dom";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { RichText } from "@/modules/RichText";
import { Text } from "@/modules/Text";
import { COLOR } from "@/utils/constants/colors";

export const Modal = ({ title, body, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const modalContent = isOpen ? (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/90 flex items-center justify-center z-9999"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={body ? "modal-description" : undefined}
    >
      <ScrollAnimation>
        <div
          className="relative bg-white p-clamp-20 lg:p-clamp-40 w-9/10 max-w-clamp-600 
              rounded-card overflow-auto flex flex-col justify-center align-center m-auto gap-clamp-30 border border-accent"
        >
          <button
            className="absolute top-2 right-4 bg-transparent border-0 cursor-pointer text-3xl transition-all hover:scale-120"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
          {title && (
            <Text color={COLOR.PRIMARY} size="heading2" id="modal-title">
              {title}
            </Text>
          )}
          {body && (
            <div id="modal-description">
              <RichText
                data={body}
                color={COLOR.BLACK}
                size="body1"
                imageSizes="(max-width: 640px) 90vw, 42vw"
              />
            </div>
          )}
        </div>
      </ScrollAnimation>
    </div>
  ) : null;

  return (
    <>
      {/* Render the trigger with click handler */}
      {cloneElement(trigger, { onClick: handleOpen })}

      {/* Render modal in portal at document root */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
};
