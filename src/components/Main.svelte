<script lang="ts">
  import type { MediaContext } from '@providers/media';
  import { getContext } from 'svelte';

  const { media } = getContext<MediaContext>('media');
</script>

<main class={$media.classNames}>
  <slot />
</main>

<style>
  main {
    width: 392px;
    margin: 0 auto;
    max-width: 100%;
    position: relative;
    margin-top: 136px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 144px;
  }

  main.media-sm {
    width: 100%;
  }
</style>
