export interface IFileRepository {
    folder: string;
    copy(): void;
    createFile(fileContent: any, filePath: string): void;
    getFolderSize(): number;
    getDriveName(): string;
}