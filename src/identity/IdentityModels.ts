export interface IIdentity {
    name: string;
    publicKey: string;
    privateKey: string;
    fingerprint: string;
}

export class Identity implements IIdentity {
    public name!: string;
    public publicKey!: string;
    public privateKey!: string;
    public fingerprint!: string;

    constructor(params: any) {
        Object.assign(this, params);
    }
}