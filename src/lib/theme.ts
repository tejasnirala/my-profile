/**
 * Single source of truth for the dark/light theme.
 *
 * Dark is the default. The choice is a `.dark` class on <html>, persisted in
 * localStorage, and mirrored into <meta name="theme-color"> so the phone's
 * status bar and browser chrome match the page.
 */
export const THEME_STORAGE_KEY = 'theme';

/** Page background per theme (matches `--background` in globals.css). */
export const THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
} as const;

export type Theme = keyof typeof THEME_COLORS;

/**
 * Inline <head> script: applies the saved theme before first paint so there's no
 * flash of the wrong theme. It runs before React, so it can't import anything —
 * it's built from the constants above instead. It also registers an empty passive
 * `touchstart` listener, which iOS Safari needs before `:active` press states fire.
 */
export const themeScript = `(function () {
  var d = true;
  try {
    var t = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (t) d = t === 'dark';
  } catch (e) {}
  document.documentElement.classList.toggle('dark', d);
  var sync = function () {
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', d ? '${THEME_COLORS.dark}' : '${THEME_COLORS.light}');
    });
  };
  sync();
  document.addEventListener('DOMContentLoaded', sync);
  document.addEventListener('touchstart', function () {}, { passive: true });
})();`;

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', THEME_COLORS[theme]));
};

/** Whether the page is currently dark. Client-only; the server assumes the default. */
export const isDarkTheme = () => document.documentElement.classList.contains('dark');

/** Calls `onChange` whenever the theme class on <html> changes. For `useSyncExternalStore`. */
export const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

/** Flips the theme with a short whole-page crossfade where View Transitions exist. */
export const toggleTheme = () => {
  const next: Theme = isDarkTheme() ? 'light' : 'dark';

  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be blocked (private mode, disabled cookies). The theme still
    // switches for this visit; it just won't be remembered.
  }

  if (!document.startViewTransition) {
    applyTheme(next);
    return;
  }
  document.startViewTransition(() => applyTheme(next));
};
