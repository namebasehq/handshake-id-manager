import type SecureLS from 'secure-ls';
import type { IIdentity } from './models';
import { Identity } from './models';

interface IIdentityRepository {
  set(key: string, data: IIdentity): Promise<void>;
  get(key: string): Promise<IIdentity>;
  remove(keys: string[]): Promise<void>;
  getAll(): Promise<Identity[]>;
}

export class IdentityRepository implements IIdentityRepository {
  static STORAGE_KEY_PREFIX: string = 'handshake:login:identity_';

  set = async (key: string, data: IIdentity): Promise<any> => {
    window.localStorage.setItem(
      IdentityRepository.STORAGE_KEY_PREFIX + btoa(key),
      JSON.stringify(data),
    );
  };

  get = async (key: string): Promise<IIdentity> => {
    const result = window.localStorage.getItem(IdentityRepository.STORAGE_KEY_PREFIX + btoa(key));
    if (!result) {
      return undefined;
    }
    return new Identity(JSON.parse(result));
  };

  remove = async (keys: string[]): Promise<void> => {
    let encodedKeys = keys.map((k) => IdentityRepository.STORAGE_KEY_PREFIX + btoa(k));
    encodedKeys.forEach((k) => window.localStorage.removeItem(k));
  };

  getAll = async (): Promise<Identity[]> => {
    return Object.entries(window.localStorage)
      .filter((k) => k[0].startsWith(IdentityRepository.STORAGE_KEY_PREFIX))
      .map((entry) => new Identity(JSON.parse(entry[1])));
  };
}

export class IdentityRepositorySecureLS implements IIdentityRepository {
  static STORAGE_KEY_PREFIX: string = 'handshake:login:identity_';

  constructor(private secureLS: SecureLS) {}

  set = async (key: string, data: IIdentity): Promise<any> => {
    this.secureLS.set(IdentityRepositorySecureLS.STORAGE_KEY_PREFIX + btoa(key), data);
  };

  get = async (key: string): Promise<IIdentity> => {
    const result = this.secureLS.get(IdentityRepositorySecureLS.STORAGE_KEY_PREFIX + btoa(key));
    if (!result) {
      return undefined;
    }
    return new Identity(result);
  };

  remove = async (keys: string[]): Promise<void> => {
    let encodedKeys = keys.map((k) => IdentityRepositorySecureLS.STORAGE_KEY_PREFIX + btoa(k));
    encodedKeys.forEach((k) => this.secureLS.remove(k));
  };

  getAll = async (): Promise<Identity[]> => {
    return Promise.all(
      this.secureLS
        .getAllKeys()
        .filter((k) => k.startsWith(IdentityRepositorySecureLS.STORAGE_KEY_PREFIX))
        .map(async (k) => {
          return await this.get(
            atob(k.substr(IdentityRepositorySecureLS.STORAGE_KEY_PREFIX.length)),
          );
        }),
    );
  };
}
