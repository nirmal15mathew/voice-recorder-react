import { motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

interface SelectionBarProps {
  selectedCount: number;
  onDelete: () => void;
  onCancel: () => void;
}

export function SelectionBar({ selectedCount, onDelete, onCancel }: SelectionBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 px-1 py-3 flex items-center justify-between"
    >
      <span className="text-base font-medium text-zinc-900 dark:text-zinc-100">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <Trash2 size={20} />
        </button>
        <button
          onClick={onCancel}
          className="text-zinc-500 hover:text-zinc-700"
          aria-label="Cancel"
        >
          <X size={20} />
        </button>
      </div>
    </motion.div>
  );
}
