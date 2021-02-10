import type { Writable } from 'svelte/store';

type MediaQueryLists = Record<string, MediaQueryList>;
type MediaShape = {
  classNames: string;
  matches: {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
  };
};
type MediaContext = {
  media: Writable<MediaShape>;
  deviceId: string;
};

export type { MediaQueryLists, MediaShape, MediaContext };
