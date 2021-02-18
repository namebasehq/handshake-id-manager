const DEVICE_KEY = 'deviceId';

export default class DeviceService {
    private static newUuid = () => {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        localStorage.setItem(DEVICE_KEY, uuid);
        return uuid;
    }
    static getDeviceId(): string {
        return localStorage.getItem(DEVICE_KEY) ?? this.newUuid();

    }
}