import { useCallback, useState } from "react";

export const useDebounce = () => {
  // Typing the timerId as NodeJS.Timeout or undefined
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>();

  // Function typing with better accuracy
  const debounce = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T extends (...args: any[]) => void>(func: T, delay = 1000) => {
      return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (timerId) {
          clearTimeout(timerId);
        }

        const newId = setTimeout(() => {
          func.apply(this, args);
        }, delay);

        setTimerId(newId);
      };
    },
    [timerId]
  );

  return {
    debounce,
  };
};
