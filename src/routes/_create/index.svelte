<script lang="ts" context="module">
  import Button from '@components/Button.svelte';
  import DomainNameWithPunycode from '@components/DomainNameWithPunycode.svelte';
  import TextInput from '@components/TextInput.svelte';
  import { Link } from '@Hashbrown';
  import type { IdentitiesContext } from '@providers/identities';
  import type { LoadingContext } from '@providers/loading';
  import type { LoginContext } from '@providers/loginFlow';
  import type { MediaContext } from '@providers/media';
  import { getContext, onMount } from 'svelte';

  enum Stages {
    ENTER_DETAILS = 'enterDetails',
    CONFIRM_DETAILS = 'confirmDetails',
  }

  const HOST = () => window.location.host;
  const PROTOCOL = () => window.location.protocol;
  const BASE_DOMAIN = () => (window as any).baseDomain || 'https://www.namebase.io';
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
  const loginFlowContext = getContext<LoginContext>('loginFlow');
  const loadingContext = getContext<LoadingContext>('loading');

  const identities = getContext<IdentitiesContext>('identities');
  const { deviceId, media } = getContext<MediaContext>('media');
  const loginFlowData = loginFlowContext.loginFlowData;

  let { list } = identities;
  let stage: Stages = Stages.ENTER_DETAILS;
  let loading: boolean = false;
  let firstTimeUser: boolean = true;
  let identityToCreate: string = $loginFlowData.id;
  let identityCreated: boolean = false;
  onMount(() => {
    if ($loginFlowData.id) {
      identityToCreate = $loginFlowData.id;
      continueToConfirm();
    }
  });
  $: if ($list.length !== 0) firstTimeUser = false;

  const continueToConfirm = async () => {
    loginFlowContext.setName(normalizeDomainName(identityToCreate));
    stage = Stages.CONFIRM_DETAILS;
  };

  const getRedirectUrl = (name: string, state: string, callbackUrl: string): string => {
    let redirectUrl: string = `${PROTOCOL()}//${HOST()}/#/login?id=${btoa(name)}&state=${btoa(
      state,
    )}&callbackUrl=${btoa(callbackUrl)}`;
    return redirectUrl.toString();
  };

  const continueToNamebase = async () => {
    loading = true;
    loadingContext.start();
    const newIdentity = await identities.generate($loginFlowData.id);
    const identityParts = `${newIdentity.name}`.split('.');

    const tld = identityParts.pop();
    const host = [deviceId, '_auth', ...identityParts].join('.');
    const records = [
      {
        host,
        ttl: 5,
        type: 'TXT',
        value: `v=0;fingerprint=${newIdentity.fingerprint}`,
      },
    ];

    const url = new URL(`${BASE_DOMAIN()}/next/domain-manager/${tld}/records`);
    const redirectUrl = getRedirectUrl(
      $loginFlowData.id,
      $loginFlowData.state,
      $loginFlowData.callbackUrl,
    );
    const encodedRedirectUrl = encodeURIComponent(encodeURIComponent(redirectUrl.toString()));

    url.searchParams.append('records', btoa(JSON.stringify(records)));
    url.searchParams.append('redirect', encodedRedirectUrl);
    loadingContext.stop();

    window.location.href = url.toString();
  };

  const continueToLogin = async () => {
    const redirectUrl = getRedirectUrl(
      $loginFlowData.id,
      $loginFlowData.state,
      $loginFlowData.callbackUrl,
    );
    window.location.href = redirectUrl.toString();
  };

  const createAndCopyRecord = async () => {
    const identity = await identities.generate(normalizeDomainName(identityToCreate));
    identityCreated = true;
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
{#if stage === Stages.ENTER_DETAILS}
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
{:else if stage === Stages.CONFIRM_DETAILS}
  <!-- <Button
    onClick={() => (stage = Stages.ENTER_DETAILS)}
    style="position: absolute; top: -8px; left: 8px;"
    variant="transparent"
  >
    <BackArrow />
  </Button> -->
  <div class="input text-variant-small text-roboto-variable text-weight-regular">
    <DomainNameWithPunycode domainName={identityToCreate} />
  </div>
  <div class="continue to-namebase {$media.classNames}">
    <Button variant="primary" onClick={continueToNamebase} disabled={loading}>
      Continue to Namebase
    </Button>
  </div>
  <div class="set-manually {$media.classNames}">
    <p class="text-variant-regular text-roboto-variable text-weight-medium">
      Handshake name not in Namebase?
    </p>
    <p class="text-variant-tiny text-roboto-variable text-weight-regular ">
      See our <a
        rel="noopener noreferrer"
        href="https://docs.namebase.io/handshake-login/using-handshake-login"
        class="text-weight-medium"
        target="_blank"
        >instructions for setting the record outside of Namebase.
      </a>
    </p>
    <p class="text-variant-tiny text-roboto-variable text-weight-regular">
      Once you have set your record, click the button below to continue.
    </p>
    {#if identityCreated}
      <Button onClick={continueToLogin} variant="secondary" disabled={loading}>
        I set my record
      </Button>
    {:else}
      <Button onClick={createAndCopyRecord} variant="secondary" disabled={loading}>
        Copy my record
      </Button>
    {/if}
  </div>
{/if}

<style>
  h1 {
    text-align: center;
    margin-bottom: 48px;
  }
  h1,
  label {
    color: var(--color-white);
  }

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

  :global(.list-link) {
    color: var(--color-grey60);
    text-decoration: underline;
  }

  :global(.list-link:hover),
  :global(.list-link:active) {
    color: var(--color-white);
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

  .set-manually {
    width: 416px;
    border: 1px solid var(--color-grey30);
    display: flex;
    padding: 32px;
    transform: translateX(-24px);
    margin-top: 48px;
    align-items: center;
    border-radius: 4px;
    flex-direction: column;
  }

  .set-manually > * + * {
    margin-top: 8px;
  }

  .set-manually.media-sm {
    width: 100%;
    transform: none;
  }

  .set-manually.media-sm > :global(button) {
    width: 100%;
  }

  .set-manually a {
    color: var(--color-brand);
  }

  .set-manually a:hover,
  .set-manually a:active {
    color: var(--color-blue50);
  }

  .set-manually p {
    color: var(--color-grey70);
    text-align: center;
  }

  .set-manually p:first-of-type {
    color: var(--color-white);
  }

  .set-manually p:last-of-type {
    padding-bottom: 24px;
  }
</style>
