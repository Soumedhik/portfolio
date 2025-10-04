import { useMemo } from 'react';
import { useResponsive } from './useResponsive';

/**
 * Computes responsive window dimensions for draggable app windows.
 * Keeps original sizing intent while adapting to the current viewport.
 */
export const useWindowSizing = (
  baseWidth,
  baseHeight,
  {
    minWidth = 360,
    minHeight = 320,
    desktopMargin = 120,
    tabletMargin = 64,
  } = {}
) => {
  const { dimensions, isMobile, isTablet, isLandscape, isPortrait } = useResponsive();

  return useMemo(() => {
    const viewportWidth = dimensions?.width ?? baseWidth;
    const viewportHeight = dimensions?.height ?? baseHeight;

  const margin = isMobile ? 0 : isTablet ? tabletMargin : desktopMargin;

    const width = isMobile
      ? viewportWidth
      : Math.max(minWidth, Math.min(baseWidth, viewportWidth - margin));
    const height = isMobile
      ? viewportHeight
      : Math.max(minHeight, Math.min(baseHeight, viewportHeight - margin));

    return {
      width,
      height,
      margin,
      viewportWidth,
      viewportHeight,
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      isLandscape,
      isPortrait,
    };
  }, [
    baseWidth,
    baseHeight,
    desktopMargin,
    dimensions?.height,
    dimensions?.width,
    isLandscape,
    isMobile,
    isPortrait,
    isTablet,
    minHeight,
    minWidth,
    tabletMargin,
  ]);
};

export default useWindowSizing;
