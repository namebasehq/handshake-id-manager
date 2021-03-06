<script lang="ts" context="module">
  import Button from '@components/Button.svelte';
  import DomainNameWithPunycode from '@components/DomainNameWithPunycode.svelte';
  import type { HashbrownContext } from '@Hashbrown';
  import type { IdentitiesContext } from '@providers/identities';
  import type { LoadingContext } from '@providers/loading';
  import type { LoginContext } from '@providers/loginFlow';
  import type { MediaContext } from '@providers/media';
  import { getContext, onDestroy, onMount } from 'svelte';
</script>

<script lang="ts">
  const identities = getContext<IdentitiesContext>('identities');
  const loading = getContext<LoadingContext>('loading');
  const { media } = getContext<MediaContext>('media');

  const loginFlowContext = getContext<LoginContext>('loginFlow');
  const loginFlowData = loginFlowContext.loginFlowData;
  const { goto } = getContext<HashbrownContext>('router');

  let confirmed = false;
  let itsTooLong = false;
  let keepScanning = true;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const confirmLoginAction = async () => {
    confirmed = true;
    keepScanning = true;

    loading.start();

    setTimeout(() => {
      itsTooLong = true;
    }, 15 * 1000);

    const login = async () => {
      const credentials = await identities.credentialsFor($loginFlowData.id, $loginFlowData.state);
      const url = new URL($loginFlowData.callbackUrl);
      const prefix = await identities.getPrefix(credentials.name);
      const data = {
        signed: btoa(credentials.signed),
        domain: btoa(credentials.name),
        deviceId: btoa(prefix),
        publicKey: btoa(credentials.publicKey),
      };

      url.hash = btoa(JSON.stringify(data));
      loginFlowContext.clear();

      window.location.href = url.toString();
    };

    while (keepScanning) {
      const isFingerprintValid = await identities.verifyFingerprintFor($loginFlowData.id);
      if (isFingerprintValid) {
        loading.stop();
        await login();
        break;
      } else {
        await sleep(2000);
      }
    }
  };
  onMount(async () => {
    if (!$loginFlowData.state) {
      goto('/list');
      return;
    }
    let credentials;
    try {
      credentials = await identities.credentialsFor($loginFlowData.id, $loginFlowData.state);
    } catch (e) {
      console.warn(e);
    }
    if (!credentials) {
      goto(`/create`);
      return;
    }
  });
  onDestroy(() => {
    keepScanning = false;
    loading.stop();
  });
</script>

<h1 class="text-roboto-mono text-variant-huge text-weight-medium">Log in</h1>
<h2 class="text-roboto-mono text-variant-regular text-weight-medium">
  Your Handshake name: <DomainNameWithPunycode domainName={$loginFlowData.id} />
</h2>
<div class="container" style="display: flex; align-items: center; justify-content: space-between">
  {#if !confirmed}
    <div class="confirm {$media.classNames}">
      <Button variant="primary" onClick={confirmLoginAction}>Continue</Button>
    </div>
  {:else if itsTooLong === true}
    <div class="text-roboto-mono text-variant-medium text-weight-medium">
      Your record might be cached. <br />
      Please wait up to 1 minute or you can <br />
      <a href="/#/create-confirm">recreate your identity here.</a>
    </div>
  {:else}
    <div class="text-roboto-mono text-variant-medium text-weight-medium">One moment please...</div>
  {/if}
</div>

<style>
  h1,
  h2 {
    color: var(--color-white);
    text-align: center;
    margin-bottom: 48px;
  }

  .container > div {
    text-align: center;
    color: var(--color-white);
    flex: 1;
  }

  .container > div a {
    color: var(--color-brand);
  }
</style>
