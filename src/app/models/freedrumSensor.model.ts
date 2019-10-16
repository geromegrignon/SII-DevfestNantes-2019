const bluetoothLEMidi = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
const bleMidiCharacteristic = '7772e5db-3868-4112-a1a9-f2669d106bf3';
const mobileNavigatorObject: any = window.navigator;

export class FreedrumSensor {
  device;
  name;
  constructor(name) {
    this.device = null;
    this.name = name;
  }

  request() {
    const options = {
      filters: [
        {name: this.name},
        {services: [bluetoothLEMidi]}
      ],
    };
    return mobileNavigatorObject.bluetooth.requestDevice(options)
      .then(device => {
        this.device = device;
      });
  }

  connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.connect();
  }

  setup() {
    return this.device.gatt.getPrimaryService(bluetoothLEMidi)
      .then(service => service.getCharacteristic(bleMidiCharacteristic))
      .then(characteristic => characteristic.startNotifications())
      .then(characteristic => characteristic);
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }
}
