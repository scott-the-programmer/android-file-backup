import {
  IFolderRepository,
  IFileRepository,
  ISystemRepository,
} from "../repositories/filesystem-interfaces";

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

  /**
   * Creates a checkpoint file in the specified directory
   * @param target file path to create the checkpoint file
   */
  private async createCheckpoint(target: string): Promise<CheckPoint> {
    const device = await this._systemRepository.getDriveName(target);
    return new CheckPoint(target, device);
  }

  /**
   * Initiates the backup
   */
  async createBackup(): Promise<void> {
    const location = await this._androidRepository!.copy(this.target);
    await this._metadataRepository.createFile(this._checkpoint!, location);
  }
}
