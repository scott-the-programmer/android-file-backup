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
