// Packages
import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(customBreakpoint?: number): boolean {
  const breakpoint = customBreakpoint || MOBILE_BREAKPOINT;

  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < breakpoint);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return !!isMobile;
}
