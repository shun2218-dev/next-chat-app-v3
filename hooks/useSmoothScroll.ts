import { RefObject, useEffect, useRef } from 'react';

// オプションにスクロールターゲットを追加
type ScrollOptions = {
  autoScroll?: boolean;
  scrollTarget?: RefObject<HTMLElement>;
};

export const useSmoothScroll = <
  T extends unknown[],
  E extends HTMLElement = HTMLDivElement,
>(
  dependencies: T,
  options?: ScrollOptions
): RefObject<E | null> => {
  const bottomRef = useRef<E>(null);

  useEffect(() => {
    const target = options?.scrollTarget?.current || bottomRef.current;

    if (options?.autoScroll !== false && target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependencies, options?.autoScroll, options?.scrollTarget]);

  return bottomRef;
};
