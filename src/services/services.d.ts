declare module '@services/device' {
  declare class DeviceService {
    static getDeviceId: () => string;
  }

  export { DeviceService };
}

declare module '@services/identity' {
  type IIdentity = import('./IdentityService/models').IIdentity;
  type SignedPublicKey = import('./IdentityService/models').SignedPublicKey;

  declare class IdentityService {
    static InstanceSecure: (passphrase: string) => IdentityService;

    deleteIdentity: (name: string) => Promise<boolean>;
    generateIdentity: (name: string) => Promise<IIdentity>;
    getIdentityByName: (name: string) => Promise<IIdentity>;
    signAndGetpublicKey: (name: string, hnsRandom: string) => Promise<SignedPublicKey>;
    fetchAllIdentityName: () => Promise<IIdentity[]>;
    fetchAllIdentityName: () => Promise<IIdentity[]>;
    verifyFingerPrint: (fingerprint, name, deviceId) => Promise<boolean>;
  }

  export { IdentityService };
  export type { IIdentity, SignedPublicKey };
}
