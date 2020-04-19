export class CheckPoint {
  timestamp: Date;
  fileLocation: string;
  deviceName: string;
  reason?: string;

  constructor(fileLocation: string, deviceName: string, reason?: string) {
    this.timestamp = new Date();
    this.fileLocation = fileLocation;
    this.deviceName = deviceName;
    this.reason = reason;
  }
}
