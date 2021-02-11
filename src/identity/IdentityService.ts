import { CryptoWrapper } from './CryptoWrapper';
import IdentityRepository from './IdentityRepository';
import type { Identity, IIdentity } from './IdentityModels';


class IdentityService {

  private static _Instance: IdentityService = null;
  public static get Instance(): IdentityService {
    return this._Instance ?? (this._Instance = new IdentityService(new CryptoWrapper(), new IdentityRepository()))
  };


  constructor(private cryptoWrapper: CryptoWrapper, private store: IdentityRepository) {

  }
  async generateIndentity(name: string) {
    const { privateKey, publicKey } = await this.cryptoWrapper.generateKeyPair();
    const publicKeyString = await this.cryptoWrapper.exportCryptoKey(publicKey);
    const identity: IIdentity = {
      name: name,
      publicKey: publicKeyString,
      privateKey: await this.cryptoWrapper.exportPrivateCryptoKey(privateKey),
      fingerprint: await this.cryptoWrapper.generateFingerprint(publicKeyString),
    };

    await this.store.set(identity.name, identity);
    return identity;
  }

  async signAndGetpublicKey(name: string, hnsRandom: string) {
    const identity = await this.store.get(name);
    if (!identity) {
      return undefined;
    }
    const privateKey = await this.cryptoWrapper.importCryptoPrivateKey(identity.privateKey);
    const signed = await this.cryptoWrapper.sign(privateKey, hnsRandom);

    return {
      publicKey: identity.publicKey,
      name: identity.name,
      signed,
      hnsRandom,
    };
  }

  async fetchAllIdentityName(): Promise<IIdentity[]> {
    const identities = await this.store.getAll();
    return Object.keys(identities).map((o) => {
      console.log({ i: identities[o] });
      return <Identity>{ name: atob(o), fingerprint: identities[o].fingerprint };
    });
  }

  async GetIdentityByName(name: string): Promise<IIdentity> {
    const identity = await this.store.get(name);
    return <IIdentity>{ name, fingerprint: identity.fingerprint };
  }

  async deleteIdentity(name: string) {
    try {
      await this.store.remove([name]);
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }
}

export default IdentityService.Instance;
