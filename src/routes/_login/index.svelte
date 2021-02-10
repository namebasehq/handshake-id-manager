<script lang="ts" context="module">
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
  const loginFlowContext = getContext<LoginContext>('loginFlow');
  const loginFlowData = loginFlowContext.loginFlowData;
  const { deviceId } = getContext<MediaContext>('media');
  const { goto } = getContext<HashbrownContext>('router');

  let itsTooLong = false;
  let keepScanning = true;
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  onDestroy(() => (keepScanning = false));

  onMount(async () => {
    keepScanning = true;
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
    loading.start();

    setTimeout(() => {
      itsTooLong = true;
    }, 15 * 1000);

    const login = () => {
      const url = new URL($loginFlowData.callbackUrl);
      const data = {
        signed: btoa(credentials.signed),
        domain: btoa(credentials.name),
        deviceId: btoa(deviceId),
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
        login();
        break;
      } else {
        await sleep(2000);
      }
    }
  });
</script>

<h1 class="text-roboto-mono text-variant-huge text-weight-medium">Log in</h1>
<div class="container" style="display: flex; align-items: center; justify-content: space-between">
  {#if itsTooLong === true}
    <div class="text-roboto-mono text-variant-medium text-weight-medium">
      Your record might be cached. <br />
      Please wait up to 1 minute or you can <br />
      <a href="/#/create">recreate your identity here.</a>
    </div>
  {:else}
    <div class="text-roboto-mono text-variant-medium text-weight-medium">One moment please...</div>
  {/if}
</div>

<style>
  h1 {
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
