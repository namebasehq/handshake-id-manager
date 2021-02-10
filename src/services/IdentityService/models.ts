export type IIdentity = {
  name: string;
  publicKey: string;
  privateKey: string;
  fingerprint: string;
};

export class Identity implements IIdentity {
  public name!: string;
  public publicKey!: string;
  public privateKey!: string;
  public fingerprint!: string;

  constructor(params: any) {
    Object.assign(this, params);
  }
}

export type SignedPublicKey = {
  name: string;
  signed: string;
  publicKey: string;
  hnsRandom: string;
};

export const STORAGE_PREFIX = 'identity_';
