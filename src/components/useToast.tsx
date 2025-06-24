
// useToast.ts
import { useState, useCallback } from 'react';
import { Toast } from './Toast';

export const useToast = (duration = 3000) => {
  const [message, setMessage] = useState<string | null>(null);

  const triggerToast = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const toast = message ? (
    <Toast message={message} duration={duration} onClose={() => setMessage(null)}
    />
  ) : null;

  return { toast, triggerToast };
};