import { IFolderRepository } from "./interfaces/folder-repository-interface";
import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import { CheckPoint } from "../models/checkpoint";

export class AndroidRepository implements IFolderRepository {
  folder: string;
  checkpoint: CheckPoint;

  /**
   * Repository for interacting with an Android file structure
   * @param folder location of the Android file structure
   * @param checkpoint checkpoint metadata
   * @param progress (optional) callback
   */
  constructor(folder: string, checkpoint: CheckPoint) {
    this.checkpoint = checkpoint;
    this.folder = folder;
  }

  /**
   * Recursively copies to the specified target path
   * @param targetPath target path to copy to
   * @param cb (Optional) callback that is called on each file copy
   */
  async copy(targetPath: string, cb: () => void = () => {}): Promise<string> {
    const backupLocation = path.join(
      targetPath,
      `${
        this.checkpoint.deviceName
      }-${this.checkpoint.timestamp.valueOf()}-droid-up`
    );

    await this.mkdir(backupLocation);

    return new Promise(async (resolve, reject) => {
      const files = await this.getFiles();
      files.forEach(async (file) => {
        const targetFilePath = file.replace(this.folder, backupLocation);
        await this.mkdir(path.dirname(targetFilePath));
        fs.copyFile(file, targetFilePath, (err) => {
          if (err) reject(err);
          cb();
        });
      });
      resolve(backupLocation);
    });
  }

  /**
   * Returns the number of files
   */
  async getFileCount(): Promise<number> {
    return (await this.getFiles()).length;
  }

  /**
   * Returns an array of files contained within the Android repository
   */
  async getFiles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob(`${this.folder}/**/*`, { nodir: true }, (error, files) => {
        if (error) reject(error);
        resolve(files);
      });
    });
  }

  private async mkdir(directoryName: string): Promise<void> {
    return new Promise((resolve, reject) =>
      fs.mkdir(directoryName, { recursive: true }, (err) => {
        if (err) reject(err);
        resolve();
      })
    );
  }
}
