import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const options = ['light', 'dark', 'auto'] as const;

  return (
    <div className="w-full px-6 py-8 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="text-2xl font-semibold text-left text-zinc-900 dark:text-zinc-100"
      >
        Settings
      </motion.h1>

      <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow space-y-4">
        <h2 className="font-medium text-zinc-700 dark:text-zinc-100">Theme</h2>

        <div className="flex justify-start space-x-2">
          {options.map((mode) => {
            const isSelected = theme === mode;
            return (
              <motion.button
                key={mode}
                onClick={() => setTheme(mode)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200
                  ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent'
                      : 'bg-transparent text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }
                `}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
