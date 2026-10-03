type LogoProps = {
  className?: string;
};

/** The wordmark: "tejas[n]", with the brackets in amber. */
export const Logo = ({ className = '' }: LogoProps) => (
  <span className={`font-bold tracking-[-0.04em] ${className}`}>
    tejas<span className="text-logo">[</span>n<span className="text-logo">]</span>
  </span>
);
