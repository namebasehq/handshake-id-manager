import { CryptoWrapper } from './CryptoWrapper';
import IdentityRepository from './IdentityRepository';
import type { IIdentity } from './IdentityModels';
import IdentityRepositorySecureLS from './IdentityRepositorySecureLS';
import SecureLS from 'secure-ls';


export default class IdentityService {

  public static Instance(): IdentityService {
    return new IdentityService(new CryptoWrapper(), new IdentityRepository());
  };
  public static InstanceSecure(passphrase: string): IdentityService {
    return new IdentityService(new CryptoWrapper(), new IdentityRepositorySecureLS(new SecureLS({ encodingType: 'des', isCompression: true, encryptionSecret: passphrase })));
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
    return identities.map(i => <IIdentity>{ name: i.name, fingerprint: i.fingerprint });

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