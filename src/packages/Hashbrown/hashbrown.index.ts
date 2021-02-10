declare module '@Hashbrown' {
  import type { SvelteComponentTyped } from 'svelte';

  type LinkProps = import('./types').LinkProps;
  type RouteProps = import('./types').RouteProps;
  type RouterProps = import('./types').RouterProps;
  type HashbrownContext = import('./types').HashbrownContext;

  export class Link extends SvelteComponentTyped<LinkProps> {}
  export class Route extends SvelteComponentTyped<RouteProps> {}
  export class Router extends SvelteComponentTyped<RouterProps> {}

  export type { HashbrownContext };
}
