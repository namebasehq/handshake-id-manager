import type { Identity, IIdentity } from './IdentityModels';

export interface IIdentityRepository {
    set(key: string, data: IIdentity): Promise<void>;
    get(key: string): Promise<IIdentity>;
    remove(keys: string[]): Promise<void>;
    getAll(): Promise<Identity[]>;
}
