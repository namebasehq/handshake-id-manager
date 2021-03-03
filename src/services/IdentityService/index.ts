import * as buffer from 'buffer';
import * as dnsPacket from 'dns-packet';
import SecureLS from 'secure-ls';
import { Crypto as CryptoWrapper } from './cryptography';
import type { Identity, IIdentity, SignedPublicKey } from './models';
import { IdentityRepository, IdentityRepositorySecureLS } from './repository';
const Buffer = buffer.Buffer;
class IdentityService {
  constructor(
    private cryptoWrapper: CryptoWrapper,
    private store: IdentityRepository,
    private dohEndpoint: string = (window as any).baseDoh ||
      'https://query.hdns.io/dns-query',
  ) {}

  public static Instance(): IdentityService {
    return new IdentityService(new CryptoWrapper(), new IdentityRepository());
  }

  public static InstanceSecure(passphrase: string): IdentityService {
    return new IdentityService(
      new CryptoWrapper(),
      new IdentityRepositorySecureLS(
        new SecureLS({ encodingType: 'des', isCompression: true, encryptionSecret: passphrase }),
      ),
    );
  }

  async generateIdentity(name: string): Promise<Identity> {
    name = name.toLowerCase();
    const { privateKey, publicKey } = await this.cryptoWrapper.generateKeyPair();
    const publicKeyString = await this.cryptoWrapper.exportCryptoKey(publicKey);
    const identity: IIdentity = {
      name: name,
      publicKey: publicKeyString,
      privateKey: await this.cryptoWrapper.exportPrivateCryptoKey(privateKey),
      fingerprint: await this.cryptoWrapper.hash(publicKeyString),
    };

    await this.store.set(identity.name, identity);
    return identity;
  }

  async signAndGetpublicKey(name: string, hnsRandom: string): Promise<SignedPublicKey> {
    name = name.toLowerCase();
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
    return identities.map((i) => <IIdentity>{ name: i.name, fingerprint: i.fingerprint });
  }

  async getIdentityByName(name: string): Promise<IIdentity> {
    name = name.toLowerCase();
    const identity = await this.store.get(name);
    return <IIdentity>{ name, fingerprint: identity.fingerprint };
  }
  async getRecordsWithDoh(type: string, name: string): Promise<string[]> {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    const options = {
      type: 'query',
      id: getRandomInt(1, 65534),
      flags: dnsPacket.RECURSION_DESIRED,
      questions: [
        {
          type: type,
          name: name,
        },
      ],
    };
    const buf = dnsPacket.encode(options);
    const url = new URL(`${this.dohEndpoint}?dns=${buf.toString('base64')}`)
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      mode: 'cors',
    });
    
    const dnsResults = dnsPacket.decode(Buffer.from(await response.arrayBuffer()));
    const txts = dnsResults.answers.reduce((a, r) => {
      return [...a, ...r.data.map((d) => String.fromCharCode.apply(null, d))];
    }, []);

    return txts;
  }
  async getRecordsAsync(type, id): Promise<Record<string, string>[]> {
    const regex = /([^;]+)=([^;]*)/g;
    try {
      const txts: string[] = await this.getRecordsWithDoh(type, id);
      const parsedRecords = txts
        .map((txt) => {
          const params: Record<string, any> = {};
          let match: RegExpExecArray = null;
          while ((match = regex.exec(txt))) {
            params[match[1]] = match[2];
          }
          return params;
        })
        .sort((a, b) => {
          if (!b.v) {
            return -1;
          }
          return a.v > b.v ? -1 : 1;
        });
      return parsedRecords;
    } catch (e) {
      console.warn('invalid hns check', e);
      return [];
    }
  }

  

  async verifyFingerPrint(fingerprint, prefix, name): Promise<boolean> {
    const isValid = await fetch(`https://oidc.namebase.io/validate?id=${btoa(name)}&deviceId=${btoa(prefix)}&fp=${btoa(fingerprint)}`);
    return (await isValid.json()).success;
    // // TODO: enable when DOH is stable
    // const txts = await this.getRecordsAsync('TXT', `${prefix}._auth.${name}`);
    // const result = txts.find((p) => p.fingerprint === fingerprint);
    // return result ? true : false;
  }
  
  async deleteIdentity(name: string): Promise<boolean> {
    name = name.toLowerCase();
    try {
      await this.store.remove([name]);
      return true;
    } catch (e) {
      return false;
    }
  }

  async hash(text: string){
    return await this.cryptoWrapper.hash(text);
  }
}

export { IdentityService };

