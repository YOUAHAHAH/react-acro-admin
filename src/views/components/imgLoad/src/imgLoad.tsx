import { useEffect, useRef } from "react";
import { obType } from "./imgLoadType";

const InOb = ({ imgRefs, root, rootMargin, threshold }: obType) => {
  const ob = useRef<IntersectionObserver>();
  useEffect(() => {
    ob.current = new IntersectionObserver(
      entries => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            const img = entry.target as any;
            new Promise(() => {
              img.src = img.dataset.src || "";
              ob.current?.unobserve(img);
            });
          }
      },
      { root, rootMargin, threshold }
    );
    const imgRefs_ = imgRefs.current;
    if (imgRefs_) {
      imgRefs_.forEach(ref => {
        if (ref) {
          ob.current?.observe(ref);
        }
      });
    }

    return () => {
      if (imgRefs_) {
        imgRefs_.forEach(ref => {
          if (ref) {
            ob.current?.unobserve(ref);
          }
        });
      }
    };
  }, [imgRefs]);

  return null;
};

export default InOb;
