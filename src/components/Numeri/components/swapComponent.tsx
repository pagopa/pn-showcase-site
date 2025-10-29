import { ReactElement } from "react";

export const swapComponent =
  (bool: boolean) => (componentA: ReactElement, componentB: ReactElement) => {
    if (bool) {
      return (
        <>
          {componentB}
          {componentA}
        </>
      );
    } else {
      return (
        <>
          {componentA}
          {componentB}
        </>
      );
    }
  };
