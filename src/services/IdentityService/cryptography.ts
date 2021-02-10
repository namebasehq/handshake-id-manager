export class Crypto {
  _enc = new TextEncoder();
  _encodeMessage = (str: string) => this._enc.encode(str);

  _str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  _ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
  }

  async generateKeyPair(): Promise<CryptoKeyPair> {
    return window.crypto.subtle.generateKey(
      {
        name: 'RSA-PSS',
        modulusLength: 4096,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: 'SHA-512',
      },
      true,
      ['sign', 'verify'],
    );
  }

  importCryptoKey(pem: string) {
    const pemHeader = '-----BEGIN PUBLIC KEY-----';
    const pemFooter = '-----END PUBLIC KEY-----';
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    const binaryDerString = atob(pemContents);
    const binaryDer = this._str2ab(binaryDerString);
    return window.crypto.subtle.importKey(
      'spki',
      binaryDer,
      {
        name: 'RSA-PSS',
        hash: 'SHA-512',
      },
      true,
      ['verify'],
    );
  }

  publickeyToArray(pem: string) {
    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    // base64 decode the string to get the binary data
    const binaryDerString = atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    return this._str2ab(binaryDerString);
  }

  importCryptoPrivateKey(pem: string) {
    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    // base64 decode the string to get the binary data
    const binaryDerString = atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = this._str2ab(binaryDerString);
    return window.crypto.subtle.importKey(
      'pkcs8',
      binaryDer,
      {
        name: 'RSA-PSS',
        // Consider using a 4096-bit key for systems that require long-term security
        hash: 'SHA-512',
      },
      true,
      ['sign'],
    );
  }

  async exportCryptoKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey('spki', key);
    const exportedAsString = this._ab2str(exported);
    const exportedAsBase64 = btoa(exportedAsString);
    return `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
  }

  async exportPrivateCryptoKey(key: CryptoKey) {
    const exported = await window.crypto.subtle.exportKey('pkcs8', key);
    const exportedAsString = this._ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    return `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
  }

  async sign(privateKey: CryptoKey, data: string) {
    const signature = await window.crypto.subtle.sign(
      {
        name: 'RSA-PSS',
        saltLength: 64,
      },
      privateKey,
      this._encodeMessage(data),
    );
    const exportedAsString = this._ab2str(signature);
    const exportedAsBase64 = window.btoa(exportedAsString);
    return exportedAsBase64;
  }

  async verifySignature(publicKey: CryptoKey, signature: string, data: string) {
    const binaryDerString = atob(signature);
    const binaryDer = this._str2ab(binaryDerString);
    return await window.crypto.subtle.verify(
      {
        name: 'RSA-PSS',
        saltLength: 128,
      },
      publicKey,
      binaryDer,
      this._encodeMessage(data),
    );
  }

  async generateFingerprint(publicKey: string) {
    const fingerprint = await crypto.subtle.digest('SHA-256', this._enc.encode(publicKey));
    const hashArray = Array.from(new Uint8Array(fingerprint));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }
}
