"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyles =
    "fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300";
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    <div
      className={`${baseStyles} ${typeStyles[type]} animate-in fade-in slide-in-from-top-4`}
    >
      {message}
    </div>
  );
}
