import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NameRecordingDialogProps {
  url: string;
  onSave: (name: string, url: string) => void;
  onCancel: () => void;
  onDiscard: () => void;
}

export function NameRecordingDialog({
  url,
  onSave,
  onCancel,
  onDiscard,
}: NameRecordingDialogProps) {
  const defaultName = `Recording - ${new Date().toLocaleString()}`;
  const [name, setName] = useState(defaultName);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-sm shadow-xl space-y-4"
        >
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Name your recording
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onDiscard}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Discard
            </button>
            <button
              onClick={onCancel}
              className="text-sm text-zinc-500 hover:text-zinc-700"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(name.trim() || defaultName, url)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
