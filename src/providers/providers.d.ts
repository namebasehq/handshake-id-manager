declare module '@providers/announcement' {
  import type { SvelteComponentTyped } from 'svelte';
  type AnnouncementContext = import('./AnnouncementContextProvider/types').AnnouncementContext;

  export type { AnnouncementContext };
  export class AnnouncementContextProvider extends SvelteComponentTyped<> {};
}