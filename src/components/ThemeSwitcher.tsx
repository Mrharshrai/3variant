import { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { activeTheme, setTheme, themes, transitioning } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const activeDef = useMemo(
    () => themes.find((t) => t.id === activeTheme) ?? themes[0],
    [themes, activeTheme]
  );
  const lightThemes = themes.filter((t) => t.mode === 'light');
  const darkThemes = themes.filter((t) => t.mode === 'dark');

  useEffect(() => {
    if (!activeDef) return;
    const key = activeDef.mode === 'light' ? '3v-last-light' : '3v-last-dark';
    try { localStorage.setItem(key, activeDef.id); } catch { /* noop */ }
  }, [activeDef]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open]);

  const switchMode = (mode: 'light' | 'dark') => {
    if (transitioning) return;
    const list = mode === 'light' ? lightThemes : darkThemes;
    let remembered: string | null = null;
    try { remembered = localStorage.getItem(mode === 'light' ? '3v-last-light' : '3v-last-dark'); } catch { /* noop */ }
    const target = list.find((t) => t.id === remembered) ?? list[0];
    if (target && target.id !== activeTheme) setTheme(target.id);
    setOpen(false);
  };

  return (
    <div className="theme-switcher" data-open={open || undefined}>
      <div
        ref={panelRef}
        className={`theme-panel ${open ? 'theme-panel--open' : ''}`}
        role="radiogroup"
        aria-label="Select theme"
      >
        {/* Quick Light / Dark toggle */}
        <div className="mode-toggle" role="group" aria-label="Switch between light and dark themes">
          <button
            type="button"
            className={`mode-btn ${activeDef?.mode === 'dark' ? 'active' : ''}`}
            onClick={() => switchMode('dark')}
            disabled={transitioning}
            tabIndex={open ? 0 : -1}
            aria-pressed={activeDef?.mode === 'dark'}
            data-mode="dark"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M12.1 9.3A5.5 5.5 0 014.7 1.9a5.5 5.5 0 107.4 7.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            Dark
          </button>
          <button
            type="button"
            className={`mode-btn ${activeDef?.mode === 'light' ? 'active' : ''}`}
            onClick={() => switchMode('light')}
            disabled={transitioning}
            tabIndex={open ? 0 : -1}
            aria-pressed={activeDef?.mode === 'light'}
            data-mode="light"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
              <path d="M7 1v1.4M7 11.6V13M1 7h1.4M11.6 7H13M2.6 2.6l1 1M10.4 10.4l1 1M11.4 2.6l-1 1M3.6 10.4l-1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Light
          </button>
        </div>

        {themes.map((t, i) => (
          <button
            key={t.id}
            role="radio"
            aria-checked={activeTheme === t.id}
            aria-label={`${t.name} theme — ${t.tagline}`}
            className={`theme-option ${activeTheme === t.id ? 'theme-option--active' : ''}`}
            onClick={() => { setTheme(t.id); setOpen(false); }}
            style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
            disabled={transitioning}
            tabIndex={open ? 0 : -1}
          >
            <div className="theme-swatch">
              {t.colors.map((c, j) => (
                <span key={j} className="theme-color" style={{ background: c }} />
              ))}
            </div>
            <div className="theme-meta">
              <span className="theme-name">{t.name}</span>
              <span className="theme-tagline">{t.tagline}</span>
            </div>
            {activeTheme === t.id && <span className="theme-active-dot" />}
          </button>
        ))}
      </div>

      <button
        ref={btnRef}
        className={`theme-toggle ${transitioning ? 'theme-toggle--switching' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close theme switcher' : 'Open theme switcher'}
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="theme-icon-palette">
          <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="3" r="1.5" fill="currentColor" />
          <circle cx="16" cy="7" r="1.5" fill="currentColor" />
          <circle cx="16" cy="13" r="1.5" fill="currentColor" />
          <circle cx="10" cy="17" r="1.5" fill="currentColor" />
          <circle cx="4" cy="13" r="1.5" fill="currentColor" />
          <circle cx="4" cy="7" r="1.5" fill="currentColor" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="theme-icon-close">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div className={`theme-transition-overlay ${transitioning ? 'active' : ''}`} aria-hidden="true" />
    </div>
  );
}
