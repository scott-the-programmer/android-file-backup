import { IFileRepository } from "./interfaces/file-repository-interface"
import * as fs from "fs";
import * as path from "path";
import { CheckPoint } from "../models/checkpoint";

/**
 * Repository for maintaining metadata files
 */
export class MetadataRepository implements IFileRepository {
  createFile(checkpoint: CheckPoint, filePath: string): Promise<string> {
    const checkpointPath = path.join(filePath, "checkpoint.json");
    return new Promise((resolve, reject) => {
      fs.writeFile(checkpointPath, checkpoint.toJson(), (err) => {
        if (err) {
          reject(err)
          return;
        };
        resolve(checkpointPath);
      });
    });
  }
}
