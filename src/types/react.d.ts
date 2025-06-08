declare module 'react' {
  export * from 'react'; export { MouseEvent } from 'react';
  export const Suspense: React.ComponentType<{ children: React.ReactNode; fallback: React.ReactNode }>;
  export type FC<P = {}> = React.FunctionComponent<P>;
  export const useState: <T>(initialState: T | (() => T)) => [T, (newState: T | ((prevState: T) => T)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: readonly any[]) => void;
  export const useCallback: <T extends (...args: any[]) => any>(callback: T, deps: readonly any[]) => T;
  export const useMemo: <T>(factory: () => T, deps: readonly any[]) => T;
  export const useRef: <T>(initialValue: T) => { current: T };
  export const useContext: <T>(context: React.Context<T>) => T;
  export const useReducer: <R extends React.Reducer<any, any>, I>(
    reducer: R,
    initialArg: I,
    init?: (arg: I) => React.ReducerState<R>
  ) => [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
  export const useLayoutEffect: (effect: () => void | (() => void), deps?: readonly any[]) => void;
  export const useImperativeHandle: <T, R extends T>(
    ref: React.Ref<T>,
    init: () => R,
    deps?: readonly any[]
  ) => void;
  export const useDebugValue: <T>(value: T, format?: (value: T) => any) => void;
  export const useId: () => string;
  export const useTransition: () => [boolean, (callback: () => void) => void];
  export const useDeferredValue: <T>(value: T) => T;
  export const useSyncExternalStore: <T>(
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => T,
    getServerSnapshot?: () => T
  ) => T;
  export const useInsertionEffect: (effect: () => void | (() => void), deps?: readonly any[]) => void;
}

declare module 'react/jsx-runtime' {
  export * from 'react/jsx-runtime';
} 