import { RefObject } from "react";

export type obType = {
  imgRefs: RefObject<(HTMLImageElement | Element | null)[]>;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};
