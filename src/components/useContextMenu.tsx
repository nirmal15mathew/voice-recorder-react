import { useState, useCallback } from 'react';
import { ContextMenu } from './ContextMenu';

interface Position {
  x: number;
  y: number;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function useContextMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const openMenu = useCallback(
    (e: React.MouseEvent, items: MenuItem[]) => {
      e.preventDefault();

      console.log("Hi")
      const { clientX, clientY } = e;

      const screenWidth = window.innerWidth;
      const menuWidth = 180;

      const x = clientX + menuWidth > screenWidth
        ? clientX - menuWidth
        : clientX;

      setPosition({ x, y: clientY });
      setMenuItems(items);
    },
    []
  );

  const closeMenu = useCallback(() => {
    setMenuItems(null);
    setPosition(null);
  }, []);

  const menu = menuItems && position ? (
    <ContextMenu position={position} items={menuItems} onClose={closeMenu} />
  ) : null;

  return { openMenu, menu };
}
