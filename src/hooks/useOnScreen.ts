import { MutableRefObject, useEffect, useRef, useState } from 'react';

const useOnScreen = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry], {}) => setIsOnScreen(entry.isIntersecting),
      {
        root: null,
        threshold: 0,
      }
    );
  }, []);

  useEffect(() => {
    if (!observerRef.current || !ref.current) return;
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [ref]);

  return isOnScreen;
};

export default useOnScreen;
