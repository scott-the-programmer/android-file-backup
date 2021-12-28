/**
 * Defines an FolderRepository used to maintain directories in the OS's file system
 */
export interface IFolderRepository {
  folder: string;

  /**
   * Copies the contents of the IFolderRepository to the target path
   * @param targetPath target path to copy to
   * @param cb to be called on each file copy
   */
  copy(targetPath: string, cb: () => void): Promise<string>;

  /**
   * Retrieves the amount of files contained within the IFolderRepository
   */
  getFileCount(): Promise<number>;
}
