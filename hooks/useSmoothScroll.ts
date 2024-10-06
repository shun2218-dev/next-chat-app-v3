import { useEffect, useRef } from 'react';

// オプションにスクロールターゲットを追加
type ScrollOptions = {
  autoScroll?: boolean;
  scrollTarget?: React.RefObject<HTMLElement>; // スクロール先のターゲット要素
};

export const useSmoothScroll = <
  T extends unknown[],
  E extends HTMLElement = HTMLDivElement,
>(
  dependencies: T,
  options?: ScrollOptions
): React.RefObject<E> => {
  const bottomRef = useRef<E>(null);

  useEffect(() => {
    const target = options?.scrollTarget?.current || bottomRef.current; // ターゲットを指定できるように

    if (options?.autoScroll !== false && target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dependencies, options?.autoScroll, options?.scrollTarget]);

  return bottomRef;
};
