import { Routes, Route, NavLink, useLocation } from 'react-router';
import RecorderPage from './pages/RecorderPage';
import RecordingsPage from './pages/RecordingsPage';
import SettingsPage from './pages/SettingsPage';
import { Mic, Folder, Settings } from 'lucide-react';
import './App.css'
import AnimatedPage from './components/AnimatedPage';

const navItems = [
  { path: '/', label: 'Record', icon: Mic },
  { path: '/recordings', label: 'Recordings', icon: Folder },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-zinc-100">
      {/* Side nav (hidden on mobile) */}
      <aside className="hidden md:flex md:flex-col md:w-24 md:py-6 md:items-center md:space-y-6 
                 md:bg-white md:dark:bg-zinc-900 md:shadow-md md:border-r md:border-zinc-200 md:dark:border-zinc-700">

        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              to={path}
              key={path}
              className={`flex flex-col items-center text-sm transition-colors ${
                isActive ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </NavLink>
          );
        })}
      </aside>

      {/* Main content */}
  <main className="flex-grow overflow-y-auto pb-24 md:pb-0 px-4 w-full bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
  <div className="mx-auto w-full max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
    <Routes>
      <Route path="/" element={<AnimatedPage children={<RecorderPage />} />} />
      <Route path="/recordings" element={<AnimatedPage children={<RecordingsPage />}/>} />
      <Route path="/settings" element={<AnimatedPage children={<SettingsPage />}/>} />
    </Routes>
  </div>
</main>


      {/* Bottom nav (mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-md border-t border-zinc-200 dark:border-zinc-700 flex justify-around py-2 md:hidden z-10">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              to={path}
              key={path}
              className={`flex flex-col items-center text-xs transition-colors ${
                isActive ? 'text-red-600' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
