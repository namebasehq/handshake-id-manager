<script lang="ts" context="module">
  import BackArrow from '@components/BackArrow.svelte';
  import Button from '@components/Button.svelte';
  import DomainNameWithPunycode from '@components/DomainNameWithPunycode.svelte';
  import TrashCan from '@components/TrashCan.svelte';
  import type { HashbrownContext } from '@Hashbrown';
  import type { IdentitiesContext } from '@providers/identities';
  import type { LoginContext } from '@providers/loginFlow';
  import type { MediaContext } from '@providers/media';
  import type { IIdentity } from '@services/identity';
  import { getContext } from 'svelte';

  const CONFIRM_DELETE_TEXT =
    'Would you like to delete this identity? You will still be able to use this name again later.';
</script>

<script lang="ts">
  const loginFlowDataContext = getContext<LoginContext>('loginFlow');
  const loginFlowData = loginFlowDataContext.loginFlowData;
  const { deviceId } = getContext<MediaContext>('media');
  const { goto } = getContext<HashbrownContext>('router');

  const {
    delete: deleteIdentity,
    list: identities,
    credentialsFor,
  } = getContext<IdentitiesContext>('identities');

  const confirmAndDelete = (name: string) => {
    if (window.confirm(CONFIRM_DELETE_TEXT)) deleteIdentity(name);
  };
  const copyRecordToClipboard = async (identity: IIdentity) => {
    const identityParts = `${identity.name}`.split('.');

    const tld = identityParts.pop();
    const host = [deviceId, '_auth', ...identityParts].join('.');
    const records = [
      {
        host,
        ttl: 60,
        type: 'TXT',
        value: `v=0;fingerprint=${identity.fingerprint}`,
      },
    ];
    navigator.clipboard.writeText(JSON.stringify(records));
  };
  const loginWithExisting = async (name: string) => {
    loginFlowDataContext.setName(name);
    goto(`/#/login`);
  };

  const setNewIdentity = () => {
    loginFlowDataContext.clearName();
    goto('/#/create');
  };
</script>

<Button
  onClick={() => window.history.back()}
  style="position: absolute; top: -8px; left: 8px;"
  variant="transparent"
>
  <BackArrow />
</Button>

<h1 class="text-roboto-mono text-variant-huge text-weight-medium">Your identities</h1>
<ul>
  {#each $identities as identity}
    <li>
      {#if !$loginFlowData?.state}
        <div
          class="color-white text-roboto-variable text-variant-small text-weight-medium"
          on:click={() => copyRecordToClipboard(identity)}
        >
          <DomainNameWithPunycode domainName={identity.name} />
        </div>
      {:else}
        <div
          class="existing-link color-white hover-color-brand text-roboto-variable text-variant-small text-weight-medium"
          on:click={() => loginWithExisting(identity.name)}
        >
          <DomainNameWithPunycode domainName={identity.name} />
        </div>
      {/if}
      <Button
        class="delete-button"
        variant="transparent"
        onClick={() => confirmAndDelete(identity.name)}
      >
        <TrashCan />
      </Button>
    </li>
  {/each}
  <li>
    <Button
      class="color-white hover-color-brand text-roboto-variable text-variant-small text-weight-medium"
      onClick={() => setNewIdentity()}
    >
      {`＋    Setup another identity`}
    </Button>
  </li>
</ul>

<style>
  h1 {
    color: var(--color-white);
    text-align: center;
  }

  ul {
    border-top: 1px solid var(--color-grey30);
    margin-top: 64px;
    border-bottom: 1px solid var(--color-grey30);
  }
  ul > * + * {
    border-top: 1px solid var(--color-grey30);
  }
  li :global(.existing-link) {
    width: 85%;
    display: block;
    overflow: hidden;
    position: relative;
    text-align: left;
    white-space: nowrap;
    white-space: pre-wrap;
    text-overflow: ellipsis;
  }

  li {
    position: relative;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  li :global(.delete-button) {
    top: 18px;
    right: 16px;
    position: absolute;
  }

  li :global(.delete-button:hover path) {
    fill: var(--color-white);
  }

  li > :global(.color-white) {
    color: var(--color-white);
  }

  li:active > :global(.hover-color-brand),
  li:hover > :global(.hover-color-brand) {
    color: var(--color-brand);
    cursor: pointer;
  }
</style>
