/**
 * src/components/ui/ConfirmDialog.tsx
 *
 * A modal confirmation dialog for destructive actions.
 * Rendered as a centered overlay with backdrop.
 */
"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "./Button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}) => {
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the cancel button when dialog opens (safer default)
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow DOM render
      const t = setTimeout(() => confirmRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="relative pixel-card max-w-md w-full p-6 sm:p-8 z-10"
        role="alertdialog"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
      >
        {/* Icon */}
        <div
          className={`w-12 h-12 flex items-center justify-center mb-4 border-[3px] border-black shadow-[3px_3px_0_#000] ${
            variant === "danger"
              ? "bg-red-900 text-red-400"
              : "bg-blue-900 text-blue-400"
          }`}
        >
          {variant === "danger" ? (
            <i className="fa-solid fa-triangle-exclamation text-xl"></i>
          ) : (
            <i className="fa-solid fa-circle-info text-xl"></i>
          )}
        </div>

        <h2
          id="confirm-dialog-title"
          className="font-pixel-title text-sm text-white mb-4"
        >
          {title}
        </h2>
        <p
          id="confirm-dialog-desc"
          className="font-pixel-sub text-sm text-gray-300 mb-8 leading-relaxed"
        >
          {description}
        </p>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            ref={confirmRef}
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
