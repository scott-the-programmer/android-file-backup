import { IFolderRepository } from "./filesystem-interfaces";
import { ncp } from "ncp";
import * as fs from "fs";
import * as path from "path";
import { CheckPoint } from "../models/checkpoint";

export class AndroidRepository implements IFolderRepository {
  folder: string;
  checkpoint: CheckPoint;

  constructor(folder: string, checkpoint: CheckPoint) {
    this.checkpoint = checkpoint;
    this.folder = folder;
  }

  async copy(targetPath: string): Promise<string> {
    
    const backupLocation = path.join(
      targetPath,
      `${this.checkpoint.deviceName}-${this.checkpoint.timestamp}-droid-up`
    );

    await this.mkdir(backupLocation);

    return new Promise((resolve, reject) =>
      ncp(this.folder, backupLocation, (err) => {
        if (err) reject(err);
        resolve(backupLocation);
      })
    );
  }

  private async mkdir(directoryName: string): Promise<void> {
    return new Promise((resolve, reject) =>
      fs.mkdir(directoryName, (err) => {
        if (err) reject(err);
        resolve();
      })
    );
  }
}
