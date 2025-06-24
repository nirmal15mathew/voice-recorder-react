// Toast.tsx
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg shadow-lg z-50 text-base transition-opacity duration-500 animate-toast bg-zinc-100 text-zinc-900 dark:bg-zinc-100 dark:text-zinc-900">
      {message}
    </div>
  );
};


