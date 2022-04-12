import { useCallback, useEffect, useRef, useState } from "react";

export function useAsyncState<T>(
  initialValue: T
): [T, (newValue: T) => Promise<T>] {
  const [state, setState] = useState<T>(initialValue);
  const refResolve = useRef<(value: T | PromiseLike<T>) => void>();

  const changeAsyncState = useCallback((newValue: T) => {
    return new Promise<T>((resolve, reject) => {
      setState(newValue);
      if (state === newValue) {
        resolve(state);
      }
      refResolve.current = resolve;
    });
  }, []);

  useEffect(() => {
    if (refResolve.current) {
      refResolve.current(state);
    }
  }, [state]);

  return [state, changeAsyncState];
}
