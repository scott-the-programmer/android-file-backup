import { IFileRepository } from "../repositories/interfaces/file-repository-interface";
import { IFolderRepository } from "../repositories/interfaces/folder-repository-interface";
import { ISystemRepository } from "../repositories/interfaces/system-repository-interface";

import { AndroidRepository } from "../repositories/android";
import { MetadataRepository } from "../repositories/metadata";
import { LinuxSystemRepository } from "../repositories/system";
import { CheckPoint } from "../models/checkpoint";

export class CreateController {
  target: string;
  source: string;

  private _androidRepository: IFolderRepository | undefined;
  private _metadataRepository: IFileRepository = new MetadataRepository();
  private _systemRepository: ISystemRepository = new LinuxSystemRepository();
  private _checkpoint: CheckPoint | undefined;

  /**
   * Controls the creation of backups
   * @param source source file path to create the backup from
   * @param target target file path to back up to
   */
  constructor(source: string, target: string) {
    this.source = source;
    this.target = target;
  }

  /**
   * Ensures that the controller is properly hydrated to make subsequent backup calls
   */
  async setup(): Promise<void> {
    this._checkpoint = await this.createCheckpoint(this.target);
    this._androidRepository = new AndroidRepository(
      this.source,
      this._checkpoint
    );
  }

  async getFileCount(): Promise<number> {
    return await this._androidRepository!.getFileCount();
  }

  /**
   * Creates a checkpoint file in the specified directory
   * @param target file path to create the checkpoint file
   */
  private async createCheckpoint(target: string): Promise<CheckPoint> {
    const device = await this._systemRepository.getDriveName(this.source);
    return new CheckPoint(target, device);
  }

  /**
   * Initiates the backup and returns the full path of the backup
   * @param progressCallBack (optional) progress callback
   */
  async createBackup(progressCallBack: () => void = () => {}): Promise<string> {
    const location = await this._androidRepository!.copy(
      this.target,
      progressCallBack
    );
    await this._metadataRepository.createFile(this._checkpoint!, location);
    return location
  }
}
