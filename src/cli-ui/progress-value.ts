import cli from "cli-ux";
import { Progress } from "./progress";

export class ProgressValue extends Progress {
  /**
   * Responsible for creating and controlling the CLI progress value
   * @param targetValue value to progress towards (see https://github.com/oclif/cli-ux)
   */
  constructor(prefixMessage: string) {
    super(
      cli.progress({
        format: `${prefixMessage} {value}`,
        fps: 100,
        synchronousUpdate: true,
      })
    );
  }
}
