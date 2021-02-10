export type LoadingContext = {
  set: (progress: number) => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
};
