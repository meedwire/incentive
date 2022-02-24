import { useCallback, useEffect, useRef, useState } from "react";

export type IReturn<T> = [T, (newValue: T) => Promise<T>];

export function useAsyncState<T>(initialValue: T): IReturn<T> {
  const [state, setState] = useState<T>(initialValue);
  const refResolve = useRef<(value: T | PromiseLike<T>) => void>(
    Promise.resolve
  );

  const changeAsyncState = useCallback((newValue: T) => {
    setState(newValue);
    return new Promise<T>((resolve) => (refResolve.current = resolve));
  }, []);

  useEffect(() => {
    if (refResolve.current) {
      refResolve.current(state);
    }
  }, [state]);

  return [state, changeAsyncState];
}
