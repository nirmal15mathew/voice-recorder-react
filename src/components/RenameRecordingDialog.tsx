import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RenameRecordingDialogProps {
  currentName: string;
  onRename: (newName: string) => void;
  onCancel: () => void;
}

export function RenameRecordingDialog({
  currentName,
  onRename,
  onCancel,
}: RenameRecordingDialogProps) {
  const [newName, setNewName] = useState(currentName);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Rename Recording
          </h2>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="text-sm text-zinc-500 hover:text-zinc-700"
            >
              Cancel
            </button>
            <button
              onClick={() => onRename(newName.trim() || currentName)}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Rename
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
