<script context="module" lang="ts">
  import { getContext } from 'svelte';
  import type { HashbrownContext, LinkProps } from '../types';
</script>

<script lang="typescript">
  const { goto } = getContext<HashbrownContext>('router');

  export let to: LinkProps['to'];
</script>

<div class={$$props.class} on:click={() => goto(to)} {...$$props}>
  <slot />
</div>

<style>
  div:hover {
    cursor: pointer;
  }
</style>
