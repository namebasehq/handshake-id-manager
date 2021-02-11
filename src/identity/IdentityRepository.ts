import { IIdentity, Identity } from './IdentityModels';
const STORAGE_PREFIX = "identity_"
export default class IdentityRepository {
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

  getAll = async (): Promise<any> => {
    const data: any = {};
    Object.entries(localStorage).filter(k => k[0].startsWith(STORAGE_PREFIX)).forEach((entry) => (data[entry[0].substr(STORAGE_PREFIX.length)] = JSON.parse(entry[1])));
    return data;
  };
}


