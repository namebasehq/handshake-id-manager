<script context="module" lang="ts">
  import CloseIcon from '@components/CloseIcon.svelte';
  import { goto, stores } from '@sapper/app';
  import type { Preload } from '@sapper/common';
  import { setContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import type { AnnouncementContext, AnnouncementRequest, AnnouncementType } from './types';

  type SapperStores = {
    page: SvelteStore<Preload.Page>;
  };

  const ANNOUNCEMENT_TYPE_TO_COLOR_MAP: Record<AnnouncementType, string> = {
    info: '#0A6CFF',
    error: '#F10013',
  };
</script>

<script lang="ts">
  // Buffer.from(JSON.stringify({ message: 'my message', type: 'error' })).toString('base64')
  // eyJtZXNzYWdlIjoiVGhpcyBpcyBhIHRlc3QgbWVzc2FnZSIsInR5cGUiOiJlcnJvciJ9
  const decodeUrlAnnouncementRequest = (queryString: string): AnnouncementRequest | null => {
    let parsedJsonString: string;
    if (typeof window === 'undefined') {
      parsedJsonString = Buffer.from(queryString).toString('ascii');
    } else {
      parsedJsonString = atob(queryString);
    }

    let parsedJsonObject: Record<string, string>;
    try {
      parsedJsonObject = JSON.parse(parsedJsonString);

      const { message, type } = parsedJsonObject;
      if (typeof message !== 'string' || typeof type !== 'string') throw new Error();

      const validTypes = ['info', 'error'];
      if (!validTypes.includes(type)) throw new Error();
    } catch (e) {
      return null;
    }

    return parsedJsonObject as AnnouncementRequest;
  };
  const { page }: SapperStores = stores();

  let bannerType: AnnouncementType;
  let bannerMessage: string = '';
  const rewriteState = (path) => {
    goto(`${path}${window.location.hash}`, { replaceState: true });
  };

  $: if (typeof window !== 'undefined') {
    const { query, path } = $page;

    let request: AnnouncementRequest | null = null;
    if (query && query.announce) request = decodeUrlAnnouncementRequest(query.announce.toString());
    if (request) {
      announce(request);
      rewriteState(path);
    }
  }

  const announce = (request: AnnouncementRequest) => {
    const { message, type = 'info' } = request;
    bannerType = type;
    bannerMessage = message;
  };

  const dismiss = () => {
    bannerMessage = '';
  };

  setContext<AnnouncementContext>('announcement', {
    announce,
  });
</script>

{#if bannerMessage}
  <aside
    role="alert"
    style="background-color: {ANNOUNCEMENT_TYPE_TO_COLOR_MAP[bannerType]};"
    transition:slide|local={{ duration: 200 }}
  >
    <div class="text">
      {bannerMessage}
    </div>
    <button class="dismiss" on:click={dismiss}>
      <CloseIcon />
    </button>
  </aside>
{/if}
<slot />

<style>
  aside {
    top: 0;
    width: 100%;
    z-index: 1;
    display: flex;
    position: sticky;
    align-items: center;
    justify-content: center;
  }

  .text {
    color: #ffffff;
    font-size: 14px;
    margin-top: 12px;
    line-height: 24px;
    padding-left: 20px;
    padding-right: 24px;
    margin-bottom: 12px;
  }

  .dismiss {
    right: 20px;
    position: absolute;
  }
</style>
