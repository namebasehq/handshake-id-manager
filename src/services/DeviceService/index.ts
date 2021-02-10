/**
 * DeviceService
 */
class DeviceService {
  static STORAGE_KEY = 'handshake:login:deviceId';

  static newUuid = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    window.localStorage.setItem(DeviceService.STORAGE_KEY, uuid);
    return uuid;
  };

  static getDeviceId(): string {
    return window.localStorage.getItem(DeviceService.STORAGE_KEY) ?? DeviceService.newUuid();
  }
}

export { DeviceService };
