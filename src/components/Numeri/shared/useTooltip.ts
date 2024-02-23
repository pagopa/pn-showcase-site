import { RefObject, useEffect } from "react";

type UseTooltip = (ref: RefObject<HTMLAnchorElement>) => void;

export const useTooltip: UseTooltip = (ref) => {
  useEffect(() => {
    async function loadTooltip() {
      if (!ref.current) return;
      const bootstrap = await import("bootstrap");
      new bootstrap.Tooltip(ref.current);
    }
    loadTooltip();
  }, [ref]);
};
