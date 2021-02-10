declare module '@providers/announcement' {
  import type { SvelteComponentTyped } from 'svelte';
  type AnnouncementContext = import('./AnnouncementContextProvider/types').AnnouncementContext;

  export type { AnnouncementContext };
  export class AnnouncementContextProvider extends SvelteComponentTyped<> {}
}

declare module '@providers/media' {
  import type { SvelteComponentTyped } from 'svelte';
  type MediaContext = import('./MediaContextProvider/types').MediaContext;

  export type { MediaContext };
  export class MediaContextProvider extends SvelteComponentTyped<> {}
}

declare module '@providers/identities' {
  import type { SvelteComponentTyped } from 'svelte';
  type IdentitiesContext = import('./IdentitiesContextProvider/types').IdentitiesContext;

  export type { IdentitiesContext };
  export class IdentitiesContextProvider extends SvelteComponentTyped<> {}
}

declare module '@providers/loginFlow' {
  import type { SvelteComponentTyped } from 'svelte';
  type LoginContext = import('./LoginContextProvider/types').LoginContext;

  export type { LoginContext };
  export class LoginContextProvider extends SvelteComponentTyped<> {}
}

declare module '@providers/loading' {
  import type { SvelteComponentTyped } from 'svelte';
  type LoadingContext = import('./LoadingContextProvider/types').LoadingContext;

  export type { LoadingContext };
  export class LoadingContextProvider extends SvelteComponentTyped<> {}
}
