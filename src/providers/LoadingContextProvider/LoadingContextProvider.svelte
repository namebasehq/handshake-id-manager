<script context="module" lang="ts">
  import { onMount, setContext } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import type { LoadingContext } from './types';
</script>

<script>
  const duration = 400;

  const progress = tweened(0, {
    duration: duration,
    easing: cubicOut,
  });

  onMount(() => {
    if (typeof window !== 'undefined') {
    }
  });

  let handle: number;
  async function cycle() {}

  setContext<LoadingContext>('loading', {
    set: progress.set,
    start: async () => {
      handle = setInterval(async () => {
        if ($progress < 0.7) {
          await progress.set($progress + duration / 3500); // 3.5 sec apdex
        } else {
          await progress.set($progress + (duration / 3500) * (1 - Math.sqrt($progress)));
        }
      }, duration);
    },
    stop: async () => {
      clearInterval(handle);
      progress.set(1);
      setTimeout(() => progress.set(0, { duration: 0 }), 400);
    },
  });
</script>

{#if $progress > 0}
  <progress class="progress" value={$progress} />
{/if}

<slot />

<style>
  .progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;

    -webkit-animation: animate-stripes 5s linear infinite;
    animation: animate-stripes 5s linear infinite;
    color: var(--color-brand) !important;
    background: transparent;
  }
  .progress::-webkit-progress-bar {
    background: transparent;
  }
  .progress::-webkit-progress-value {
    background: var(--color-brand);
  }

  .progress::-moz-progress-bar {
    background: transparent;
  }
  .progress::-moz-progress-value {
    background: var(--color-brand);
  }
</style>
