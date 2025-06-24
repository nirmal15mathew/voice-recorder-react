import { useEffect, useRef } from 'react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface ContextMenuProps {
  position: { x: number; y: number };
  items: MenuItem[];
  onClose: () => void;
}

export function ContextMenu({ position, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !(e.target instanceof Node && menuRef.current.contains(e.target))
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-44 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-left text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <span className="mr-2">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
