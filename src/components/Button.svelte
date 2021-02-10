<script context="module" lang="ts">
  import type { MediaContext } from '@providers/media';
  import { getContext } from 'svelte';

  type ButtonVariant = 'primary' | 'secondary' | 'transparent';
</script>

<script>
  const { media } = getContext<MediaContext>('media');

  export let variant: ButtonVariant;
  export let onClick: () => void;

  let variantClassname: string;
  if (variant === 'primary') {
    variantClassname = 'button-variant-primary';
  } else if (variant === 'transparent') {
    variantClassname = 'button-variant-transparent';
  } else if (variant === 'secondary') {
    variantClassname = 'button-variant-secondary';
  }

  const clickCallback = () => onClick();
</script>

<button
  on:click={clickCallback}
  class="{$$props.class} {variantClassname} {$media.classNames} text-roboto-variable text-variant-small text-weight-medium"
  {...$$props}
>
  <slot />
</button>

<style>
  button {
    width: max-content;
    border-radius: 4px;
  }

  .button-variant-primary {
    color: var(--color-white);
    padding: 8px 24px;
    background: var(--color-brand);
  }

  .button-variant-primary.media-sm {
    padding: 12px 24px;
  }

  .button-variant-primary:hover,
  .button-variant-primary:active {
    background: var(--color-blue50);
  }

  .button-variant-transparent {
    height: max-content;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-variant-secondary {
    color: var(--color-brand);
    padding: 4px 24px;
    border: 1px solid var(--color-brand);
  }

  .button-variant-secondary:hover,
  .button-variant-secondary:active {
    color: var(--color-blue50);
    border: 1px solid var(--color-blue50);
  }
</style>
