import { useState } from "react";
import { useRecordingContext } from "../context/RecordingContext";
import { RecordingItem } from "../components/RecordingItem";
import { SelectionBar } from "../components/SelectionBar";
import { AnimatePresence, motion } from "framer-motion";
import { RenameRecordingDialog } from "../components/RenameRecordingDialog";

export default function RecordingsPage() {
  const { recordings, removeRecording, renameRecording } = useRecordingContext();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [renameDialog, setRenameDialog] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const filtered = recordings.filter((r) =>
  r.name.toLowerCase().includes(search.toLowerCase())
);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const toggleSelection = (url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());
  const deleteSelected = () => {
    selected.forEach((url) => removeRecording(url));
    clearSelection();
  };

  return (
    <div className="w-full px-6 py-8 space-y-6 relative">
      <AnimatePresence mode="wait">
  {isMobile && selected.size > 0 ? (
    <SelectionBar
      key="selection-bar"
      selectedCount={selected.size}
      onDelete={deleteSelected}
      onCancel={clearSelection}
    />
  ) : (
    <motion.h1
      key="recordings-header"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="text-2xl font-semibold text-left text-zinc-900 dark:text-zinc-100"
    >
      Recordings
    </motion.h1>
  )}
</AnimatePresence>
<input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search recordings..."
  className="w-full px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 shadow-sm transition"
/>




      {recordings.length === 0 ? (
        <p className="text-left text-zinc-500 dark:text-zinc-400">
          No recordings yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((r, i) => (
            <li key={i}>
              <RecordingItem
                recording={r}
                selected={selected.has(r.url)}
                onDelete={(url) => removeRecording(url)}
                onClick={() => {
                  console.log(isMobile);
                  if (isMobile) toggleSelection(r.url);
                }}
                setRenameDialog={setRenameDialog}
              />
            </li>
          ))}
        </ul>
      )}
      {renameDialog && (
  <RenameRecordingDialog
    currentName={renameDialog.name}
    onRename={(newName) => {
      renameRecording(renameDialog.url, newName);
      setRenameDialog(null);
    }}
    onCancel={() => setRenameDialog(null)}
  />
)}

    </div>
  );
}
