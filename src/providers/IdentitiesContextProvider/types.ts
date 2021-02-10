import type { IIdentity, SignedPublicKey } from '@services/identity';
import type { Writable } from 'svelte/store';

export type IdentitiesContext = {
  list: Writable<IIdentity[]>;
  delete: (name: string) => Promise<void>;
  generate: (name: string) => Promise<IIdentity>;
  credentialsFor: (name: string, data: string) => Promise<SignedPublicKey>;
  verifyFingerprintFor: (name: string) => Promise<boolean>;
};
