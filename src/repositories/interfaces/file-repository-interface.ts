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
