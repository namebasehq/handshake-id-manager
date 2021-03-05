<script lang="ts" context="module">
  import { Link } from '@Hashbrown';
  import type { IdentitiesContext } from '@providers/identities';
  import { getContext } from 'svelte';
</script>

<script lang="ts">
  const identities = getContext<IdentitiesContext>('identities');

  let { list } = identities;
  let firstTimeUser: boolean = true;
  $: if ($list.length !== 0) firstTimeUser = false;
</script>

<h1 class="text-roboto-mono text-variant-huge text-weight-medium">Set up a new identity</h1>
<div style="display: flex; align-items: center; justify-content: space-between">
  <label for="new-id" class="text-roboto-mono text-variant-small text-weight-medium">
    Your Handshake name
  </label>
  {#if $list.length && !firstTimeUser}
    <Link class="list-link text-roboto-variable text-variant-tiny text-weight-medium" to={`/list`}>
      Select a different identity
    </Link>
  {/if}
</div>

<style>
  h1 {
    text-align: center;
    margin-bottom: 48px;
  }

  h1,
  label {
    color: var(--color-white);
  }

  :global(.list-link) {
    color: var(--color-grey60);
    text-decoration: underline;
  }

  :global(.list-link:hover),
  :global(.list-link:active) {
    color: var(--color-white);
  }
</style>
