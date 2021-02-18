import type SecureLS from 'secure-ls';
import { IIdentity, Identity, STORAGE_PREFIX } from './IdentityModels';
import type { IIdentityRepository } from './IIdentityRepository';

export default class IdentityRepository implements IIdentityRepository {

  constructor(private secureLS: SecureLS) {
  }

  set = async (key: string, data: IIdentity): Promise<any> => {
    this.secureLS.set(STORAGE_PREFIX + btoa(key), data);
  };

  get = async (key: string): Promise<IIdentity> => {
    const result = this.secureLS.get(STORAGE_PREFIX + btoa(key));
    if (!result) { return undefined; }
    return new Identity(result);
  };
  remove = async (keys: string[]): Promise<void> => {
    let encodedKeys = keys.map(k => STORAGE_PREFIX + btoa(k));
    encodedKeys.forEach((k) => this.secureLS.remove(k));
  };

  getAll = async (): Promise<Identity[]> => {
    return Promise.all(this.secureLS.getAllKeys().filter(k => k.startsWith(STORAGE_PREFIX)).map(async k => {
      console.log(atob(k.substr(STORAGE_PREFIX.length)))

      return await this.get(atob(k.substr(STORAGE_PREFIX.length)))
    }));
  };
}


