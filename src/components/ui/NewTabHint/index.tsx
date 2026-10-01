/**
 * Tells screen-reader users a link opens a new tab (WCAG 2.4.4 / 3.2.5).
 * Put it inside every `target="_blank"` link, after the visible text.
 */
export const NewTabHint = () => <span className="sr-only"> (opens in a new tab)</span>;
