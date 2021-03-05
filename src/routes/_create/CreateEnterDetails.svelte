<script lang="ts" context="module">
  import Button from '@components/Button.svelte';
  import TextInput from '@components/TextInput.svelte';
  import type { HashbrownContext } from '@Hashbrown';
  import type { LoginContext } from '@providers/loginFlow';
  import type { MediaContext } from '@providers/media';
  import { getContext } from 'svelte';
  import CreateHeader from './CreateHeader.svelte';

  const MAX_DOMAIN_NAME_LENGTH = 63;

  const normalizeDomainName = (domainName: string): string => {
    const normalizedDomainName = domainName.toLowerCase();
    return normalizedDomainName
      .substring(0, MAX_DOMAIN_NAME_LENGTH)
      .replace(/[^a-z0-9-_\.]+/g, '')
      .replace(/^[-_]+/g, '')
      .replace(/[-_]+$/g, '');
  };
</script>

<script lang="ts">
  const { goto } = getContext<HashbrownContext>('router');
  const { media } = getContext<MediaContext>('media');
  const loginFlowContext = getContext<LoginContext>('loginFlow');

  const loginFlowData = loginFlowContext.loginFlowData;

  let identityToCreate: string = $loginFlowData.id;

  const continueToConfirm = async () => {
    loginFlowContext.setName(normalizeDomainName(identityToCreate));
    goto('/create/confirm');
  };
</script>

<form on:submit={continueToConfirm}>
  <CreateHeader />
  <div class="input">
    <TextInput
      id="new-id"
      name="new-id"
      bind:value={identityToCreate}
      placeholder="Enter a Handshake name that you own*"
    />
  </div>
  <div class="continue to-confirm {$media.classNames}">
    <Button variant="primary" onClick={() => continueToConfirm()} disabled={!identityToCreate}>
      Continue
    </Button>
  </div>
</form>

<style>
  .input {
    margin-top: 16px;
    margin-bottom: 24px;
  }

  .input.text-variant-small {
    color: var(--color-grey70);
    overflow: hidden;
    margin-top: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .continue {
    display: flex;
  }

  .continue.to-confirm {
    justify-content: flex-end;
  }

  .continue.to-namebase {
    padding-top: 16px;
    justify-content: center;
  }

  .continue.media-sm > :global(button) {
    width: 100%;
  }
</style>
