import { createContext, useContext } from 'react';
import { themes, type ThemeDef } from './theme-data';

export type { ThemeDef };

export interface ThemeContextValue {
  activeTheme: string;
  setTheme: (id: string) => void;
  themes: typeof themes;
  transitioning: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
