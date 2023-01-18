import { useApplication } from '../hooks/useApplication';

import { MoonStars, Sun } from 'phosphor-react';

export function Toggle() {
  const { theme, setTheme } = useApplication();

  return (
    <div className="flex">
      <p className="font-bold text-3xl dark:text-white"></p>
      {theme === 'light' ? (
        <MoonStars size={32} className="cursor-pointer dark:text-white" onClick={() => setTheme('dark')} />
      ) : (
        <Sun size={32} className="cursor-pointer dark:text-white" onClick={() => setTheme('light')} />
      )}
    </div>
  )
}