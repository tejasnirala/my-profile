import type { CSSProperties } from 'react';

/**
 * Position in a staggered entrance. Pairs with the `enter` utility in globals.css,
 * which delays each element by `--i × 60ms`.
 */
export const stagger = (index: number) => ({ '--i': index }) as CSSProperties;
