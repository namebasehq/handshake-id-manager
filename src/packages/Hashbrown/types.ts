import type { Writable } from 'svelte/store';

export type HashbrownContext = {
  goto: (path: string) => void;
  path: Writable<string>;
  hash: Writable<string>;
  query: Writable<Record<string, string>>;
}

export type RouteProps = {
  path: string;
}

export type RouterProps = {
  default: string;
}