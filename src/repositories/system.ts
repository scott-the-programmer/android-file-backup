import { ISystemRepository } from "./filesystem-interfaces";
import getSize = require("get-folder-size");

export module folderModule{
  export function getSize(folder:string,callback:(err:any,size:any)=> void): void {
    getSize(folder,callback)
  };
}

/**
 * Abstract class that defines system level utilities
 */
abstract class SystemRepository implements ISystemRepository {
  /**
   * Returns the size of a folder in MB
   * @param folder path to get the size of
   */
  async getFolderSize(folder: string): Promise<number> {
    return new Promise<number>((resolve, reject) =>
      folderModule.getSize(folder, (err, size) => {
        if (err) reject(err);
        resolve(size);
      })
    );
  }

  /**
   * Returns the drive / device name, derived from the folder path
   * @param folder path to derive the device/drive from
   */
  abstract getDriveName(folder: string): Promise<string>;
}

/**
 * Provides Linux tailored functionality of the SystemRepository abstract class
 */
export class LinuxSystemRepository extends SystemRepository {
  private MTP_IDENTIFIER = "mtp:host=";

  async getDriveName(folder: string): Promise<string> {
    let deviceName = "android-device";
    if (folder.includes(""))
      deviceName = folder.split(this.MTP_IDENTIFIER)[1]
        ? folder.split(this.MTP_IDENTIFIER)[1]
        : deviceName;

    return new Promise((resolve) => {
      resolve(deviceName);
    });
  }
}
