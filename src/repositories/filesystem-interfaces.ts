import { CheckPoint } from '../models/checkpoint';

/**
 * Defines an FolderRepository used to maintain directories in the OS's file system
 */
export interface IFolderRepository {
  folder: string;

  /**
   *  Copies `folder` recursively to the targetPath location
   */
  copy(targetPath: string): Promise<string>;
}

/**
 * Defines an FileRepository used to maintain the OS's file system
 */
export interface IFileRepository {
  /**
   * Creates a file in the specified location
   * @param fileContent string contents of th e file
   * @param filePath string file path
   */
  createFile(fileContent: any, filePath: string): Promise<string>;
}

/**
 * Defines an FileRepository used to maintain the OS's file system
 */
export interface ISystemRepository {
  /**
   * Returns the size of the folder in MiB
   */
  getFolderSize(folder: string): Promise<number>;

  /**
   * Returns the device/drive that the current folder is located in
   */
  getDriveName(folder: string): Promise<string>;
}
