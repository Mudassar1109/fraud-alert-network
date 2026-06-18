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
          className={`rounded-lg px-5 py-4 shadow-lg border pointer-events-auto animate-in slide-in-from-right-full ${
            toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : toast.type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : toast.type === "warning"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : "bg-blue-500/10 border-blue-500/30 text-blue-300"
          }`}
        >
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
