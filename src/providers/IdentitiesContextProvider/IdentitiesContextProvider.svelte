<script context="module" lang="ts">
  import { DeviceService } from '@services/device';
  import type { IIdentity } from '@services/identity';
  import { IdentityService } from '@services/identity';
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { IdentitiesContext } from './types';

  const PASSPHRASE_STORAGE_KEY = 'handshake:login:passphrase';
</script>

<script>
  let identityService: IdentityService;

  let identities: IIdentity[] = [];
  const writeableIdentities = writable<IIdentity[]>(identities);

  onMount(() => {
    if (typeof window !== 'undefined') {
      const passphrase = getPassphrase();
      identityService = IdentityService.InstanceSecure(passphrase);

      const fetchIdentities = async () => {
        const identities = await identityService.fetchAllIdentityName();
        writeableIdentities.update(() => identities);
      };

      fetchIdentities();
    }
  });

  const getPassphrase = () => {
    const passphrase = window.localStorage.getItem(PASSPHRASE_STORAGE_KEY);
    if (typeof passphrase === 'string') {
      return passphrase;
    }
    const newPassphrase = Math.random().toString(36).substring(2, 15);
    window.localStorage.setItem(PASSPHRASE_STORAGE_KEY, newPassphrase);
    return newPassphrase;
  };

  const _delete: IdentitiesContext['delete'] = async (name: string) => {
    const deleteSuccess = await identityService.deleteIdentity(name);
    if (deleteSuccess) {
      writeableIdentities.update((existingIdentities) => {
        return existingIdentities.filter((id) => id.name !== name);
      });
    }
  };

  const generate: IdentitiesContext['generate'] = async (name: string) => {
    const newIdentity = await identityService.generateIdentity(name);
    writeableIdentities.update((existingIdentities) => [newIdentity, ...existingIdentities]);
    return newIdentity;
  };

  const credentialsFor: IdentitiesContext['credentialsFor'] = async (
    name: string,
    data: string,
  ) => {
    const creds = await identityService.signAndGetpublicKey(name, data);
    return creds;
  };

  const verifyFingerprintFor: IdentitiesContext['verifyFingerprintFor'] = async (name: string) => {
    const identity = await identityService.getIdentityByName(name);
    if (!identity) {
      return false;
    }
    const isFingerprintValid = await identityService.verifyFingerPrint(
      identity.fingerprint,
      await getPrefix(name),
      name,
    );
    return isFingerprintValid;
  };

  const getPrefix: IdentitiesContext['getPrefix'] = async (name: string) => {
    const prefix = await identityService.hash(name + DeviceService.getDeviceId());
    return prefix.substr(0, 16);
  };

  setContext<IdentitiesContext>('identities', {
    list: writeableIdentities,
    delete: _delete,
    generate,
    credentialsFor,
    verifyFingerprintFor,
    getPrefix,
  });
</script>

<slot />
