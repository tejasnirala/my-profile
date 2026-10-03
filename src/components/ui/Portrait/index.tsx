import type React from 'react';
import Image from 'next/image';
import portraitDark from '@/assets/portrait-dark.webp';
import portraitLight from '@/assets/portrait-light.webp';
import { PROFILE } from '@/constants/profile';

type PortraitProps = {
  className?: string;
  /** For the `enter` stagger (`stagger(n)` from lib/motion). */
  style?: React.CSSProperties;
  /** Passed to `next/image` so it picks the right width from the srcset. */
  sizes: string;
};

// Bottom edge of the sketch dissolves into the page instead of ending in a cut.
const imageClasses = 'h-auto w-full select-none [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]';

/**
 * The sketched portrait, recolored per theme (see design/portrait/tint.py).
 * Both versions are in the HTML and CSS shows the one for the current theme, so
 * there's no flash when the theme script runs. Dark is the default theme, so the
 * dark version is preloaded; the light one is lazy, and browsers don't fetch a
 * lazy image while it's `display: none`.
 */
export const Portrait = ({ className = '', style, sizes }: PortraitProps) => (
  <div className={className} style={style}>
    <Image
      src={portraitDark}
      alt={PROFILE.portraitAlt}
      sizes={sizes}
      preload
      fetchPriority="high"
      className={`hidden dark:block ${imageClasses}`}
    />
    <Image
      src={portraitLight}
      alt={PROFILE.portraitAlt}
      sizes={sizes}
      loading="lazy"
      className={`dark:hidden ${imageClasses}`}
    />
  </div>
);
