declare module '@Hashbrown' {
  import type { SvelteComponentTyped } from 'svelte';

  type RouteProps = import('./types').RouteProps;
  type RouterProps = import('./types').RouterProps;
  type HashbrownContext = import('./types').HashbrownContext;

  export class Route extends SvelteComponentTyped<RouteProps> {};
  export class Router extends SvelteComponentTyped<RouterProps> {}

  export type { HashbrownContext };
}