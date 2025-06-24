import { useRef, useState } from 'react';
import { Trash2, Play, Pause } from 'lucide-react';
import type {Recording} from '../context/RecordingContext'
import { useContextMenu } from './useContextMenu';
import { useLongPress } from './useLongPress';


interface RecordingItemProps {
  recording: Recording;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => void;
  selected?: boolean;
  onDelete: (url: string) => void;
  setRenameDialog: ({url, name}: {url: string, name: string}) => void;
}


export function RecordingItem({ recording, onDelete, selected, onClick, setRenameDialog }: RecordingItemProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { openMenu, menu } = useContextMenu();

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
  };
  const longPressEvents = useLongPress(() => {
    if (onClick) onClick(undefined);
  }, 500);

  return (
    <>
      <div
        {...longPressEvents}
        onContextMenu={(e) => {
        e.preventDefault()
        console.log("Trig")
          if (window.innerWidth >= 768) {
            openMenu(e, [
              {
                label: 'Delete',
                icon: <Trash2 size={16} />,
                onClick: () => {
                  // your delete handler
                  onDelete(recording.url)
                },
              },
            ]);
          }
        }}
        className={`p-4 rounded-lg shadow  flex items-center justify-between border ${selected ? 'border-red-500' : 'border-transparent'}`}

      >
        <audio
          ref={audioRef}
          src={recording.url}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
        <div className="flex-1 mr-4">
        <p
  onClick={() => setRenameDialog({ name: recording.name, url: recording.url })}
  className="font-medium text-zinc-800 dark:text-zinc-100 truncate cursor-pointer hover:underline"
>
  {recording.name}
</p>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">{recording.createdAt.toLocaleString()}</p>
      </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayback();
          }}
          className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
    
      </div>
      {menu}
    </>
  );
}
