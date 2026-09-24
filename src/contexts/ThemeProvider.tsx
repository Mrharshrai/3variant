import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { themes } from './theme-data';
import { ThemeContext, type ThemeContextValue } from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      return localStorage.getItem('3v-theme2') || 'light';
    } catch {
      return 'light';
    }
  });
  const [transitioning, setTransitioning] = useState(false);

  const setTheme = useCallback((id: string) => {
    if (id === activeTheme || transitioning) return;
    setTransitioning(true);
    document.documentElement.setAttribute('data-transitioning', '');

    setTimeout(() => {
      setActiveTheme(id);
      try { localStorage.setItem('3v-theme2', id); } catch { /* noop */ }
    }, 400);

    setTimeout(() => {
      setTransitioning(false);
      document.documentElement.removeAttribute('data-transitioning');
    }, 900);
  }, [activeTheme, transitioning]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const value: ThemeContextValue = { activeTheme, setTheme, themes, transitioning };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
