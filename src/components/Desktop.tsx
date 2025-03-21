import React, { useState, useEffect } from 'react';
import { Window } from './Window';
import { TaskBar } from './TaskBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';

const GRID_SIZE = 50;

interface WindowState {
  id: number;
  title: string;
  position: { x: number; y: number };
}

interface IconPosition {
  x: number;
  y: number;
}

interface DesktopIconProps {
  title: string;
  iconUrl: string;
  position: IconPosition;
  onDragEnd: (position: IconPosition) => void;
}

const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

const DesktopIcon = ({ title, iconUrl, position, onDragEnd }: DesktopIconProps) => {
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    onDragEnd({
      x: snapToGrid(e.clientX - dragOffset.x),
      y: snapToGrid(e.clientY - dragOffset.y),
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: dragging ? 'grabbing' : 'pointer',
      }}
      onMouseDown={handleMouseDown}
    >
      <img src={iconUrl} alt={title} className="w-12 h-12" />
      <div className="text-center text-white">{title}</div>
    </div>
  );
};

export const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextId, setNextId] = useState(1);
  const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>({
    'My Documents': { x: 100, y: 100 },
    'Notepad': { x: 200, y: 100 },
    'My Briefcase': { x: 300, y: 100 },
    'My Pictures': { x: 400, y: 100 },
    'My Videos': { x: 500, y: 100 },
  });

  const openWindow = (title: string) => {
    const offset = (windows.length * 30) % 150;
    setWindows([
      ...windows,
      { 
        id: nextId, 
        title,
        position: { x: 100 + offset, y: 100 + offset }
      },
    ]);
    setNextId(nextId + 1);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const closeAllWindows = () => setWindows([]);

  const handleIconDrag = (title: string, newPosition: IconPosition) => {
    setIconPositions((prev) => ({
      ...prev,
      [title]: newPosition,
    }));
  };

  const desktopIcons = [
    { title: 'My Documents', iconUrl: '/assets/Folder.png' },
    { title: 'Notepad', iconUrl: '/assets/Notes.png' },
    { title: 'My Briefcase', iconUrl: '/assets/BriefCase.png' },
    { title: 'My Pictures', iconUrl: '/assets/Pictures.png' },
    { title: 'My Videos', iconUrl: '/assets/Videos.png' },
  ];

  useEffect(() => {
    const savedPositions = localStorage.getItem('desktop-icon-positions');
    if (savedPositions) {
      setIconPositions(JSON.parse(savedPositions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('desktop-icon-positions', JSON.stringify(iconPositions));
  }, [iconPositions]);

  return (
    <div className="min-h-screen bg-[url('/assets/Background_Windows.png')] bg-cover bg-center p-4">
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.title}
          title={icon.title}
          iconUrl={icon.iconUrl}
          position={iconPositions[icon.title]}
          onDragEnd={(newPosition) => handleIconDrag(icon.title, newPosition)}
        />
      ))}

      {windows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          initialPosition={window.position}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">{window.title}</h2>
            <p className="text-gray-600">Content for {window.title}</p>
          </div>
        </Window>
      ))}

      <TaskBar onCloseAllWindows={closeAllWindows} />
    </div>
  );
};
