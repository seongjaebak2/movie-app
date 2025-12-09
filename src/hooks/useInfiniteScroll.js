import { useEffect, useRef } from "react";

export default function useInfiniteScroll(callback) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback]);

  return ref;
}
