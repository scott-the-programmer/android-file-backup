/**
 * Defines an FolderRepository used to maintain directories in the OS's file system
 */
export interface IFolderRepository {
  folder: string;

  /**
   *  Copies `folder` recursively to the targetPath location
   */
  copy(targetPath: string, cb: () => void): Promise<string>;

  getFileCount(): Promise<number>;
}
