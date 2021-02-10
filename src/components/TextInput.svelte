<script lang="ts">
  export let value: string = '';
</script>

<input
  bind:value
  class="textinput text-variant-small text-roboto-variable color-white"
  {...$$props}
/>

<style>
  .textinput {
    width: 100%;
    color: var(--color-white);
    border: 1px solid var(--color-grey30);
    outline: none;
    padding: 12px 12px;
    max-width: 100%;
    min-width: 100%;
    min-height: 48px;
    background: transparent;
    caret-color: var(--color-brand);
    border-radius: 4px;
  }

  .textinput::placeholder {
    color: var(--color-grey50);
  }
</style>
