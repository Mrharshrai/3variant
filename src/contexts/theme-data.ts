export interface ThemeDef {
  id: string;
  name: string;
  tagline: string;
  colors: string[];
  mode: 'light' | 'dark';
}

export const themes: ThemeDef[] = [
  {
    id: 'light',
    name: 'Light',
    tagline: 'Enterprise light & gold',
    colors: ['#B8860B', '#FAFAFA', '#FFFFFF', '#111827'],
    mode: 'light',
  },
  {
    id: 'cream',
    name: 'Noir',
    tagline: 'Obsidian & champagne gold',
    colors: ['#D4AF37', '#05080C', '#0B1118', '#ffffff'],
    mode: 'dark',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    tagline: 'Neon-lit future',
    colors: ['#00f0ff', '#ff00aa', '#0a0a1a', '#e0e0ff'],
    mode: 'dark',
  },
  {
    id: 'minimal',
    name: 'Enterprise',
    tagline: 'Clean & confident',
    colors: ['#1a56db', '#111827', '#ffffff', '#f9fafb'],
    mode: 'light',
  },
  {
    id: 'bold',
    name: 'Creative',
    tagline: 'Unapologetically bold',
    colors: ['#ff4d00', '#7c3aed', '#0d0d0d', '#fafafa'],
    mode: 'dark',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    tagline: 'Glass & light',
    colors: ['#6366f1', '#a855f7', '#0f0a1e', '#c4b5fd'],
    mode: 'dark',
  },
];