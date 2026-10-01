/**
 * Single source of truth for the dark/light theme.
 *
 * Dark is the default. The choice is a `.dark` class on <html>, persisted in
 * localStorage.
 */
export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

/**
 * Inline <head> script: applies the saved theme before first paint so there's no
 * flash of the wrong theme. It runs before React, so it can't import anything —
 * it's built from the constants above instead.
 */
export const themeScript = `(function () {
  var d = true;
  try {
    var t = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (t) d = t === 'dark';
  } catch (e) {}
  document.documentElement.classList.toggle('dark', d);
})();`;

/** Flips the theme and remembers the choice. */
export const toggleTheme = () => {
  const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';

  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be blocked (private mode, disabled cookies). The theme still
    // switches for this visit; it just won't be remembered.
  }

  document.documentElement.classList.toggle('dark', next === 'dark');
};
