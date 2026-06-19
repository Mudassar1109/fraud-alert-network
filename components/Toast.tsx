"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const toastStore: {
  listeners: Array<(toasts: Toast[]) => void>;
  toasts: Toast[];
} = {
  listeners: [],
  toasts: [],
};

export const showToast = (message: string, type: ToastType = "info", duration = 3000) => {
  const id = Math.random().toString(36).substring(2);
  const toast: Toast = { id, message, type };

  toastStore.toasts = [...toastStore.toasts, toast];
  toastStore.listeners.forEach((listener) => listener(toastStore.toasts));

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  return id;
};

export const removeToast = (id: string) => {
  toastStore.toasts = toastStore.toasts.filter((t) => t.id !== id);
  toastStore.listeners.forEach((listener) => listener(toastStore.toasts));
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setToasts(newToasts);
    toastStore.listeners.push(listener);

    return () => {
      toastStore.listeners = toastStore.listeners.filter((l) => l !== listener);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg px-4 py-3 shadow-lg border pointer-events-auto animate-in slide-in-from-right-full ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : toast.type === "error"
                ? "bg-red-50 border-red-300 text-red-900"
                : toast.type === "warning"
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : "bg-blue-50 border-blue-300 text-blue-900"
          }`}
        >
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
