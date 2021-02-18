import { IIdentity, Identity, STORAGE_PREFIX } from './IdentityModels';
import type { IIdentityRepository } from './IIdentityRepository';
export default class IdentityRepository implements IIdentityRepository {
  set = async (key: string, data: IIdentity): Promise<any> => {
    localStorage.setItem(STORAGE_PREFIX + btoa(key), JSON.stringify(data));
  };

  get = async (key: string): Promise<IIdentity> => {
    const result = localStorage.getItem(STORAGE_PREFIX + btoa(key));
    if (!result) { return undefined; }
    return new Identity(JSON.parse(result));
  };
  remove = async (keys: string[]): Promise<void> => {
    let encodedKeys = keys.map(k => STORAGE_PREFIX + btoa(k));
    encodedKeys.forEach((k) => localStorage.removeItem(k));
  };

  getAll = async (): Promise<Identity[]> => {
    return Object.entries(localStorage).filter(k => k[0].startsWith(STORAGE_PREFIX)).map((entry) => new Identity(JSON.parse(entry[1])));
  };
}



