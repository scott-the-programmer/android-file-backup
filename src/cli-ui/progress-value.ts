import cli from "cli-ux";
import { Progress } from "./progress";

export class ProgressValue extends Progress {

  /**
   * Responsible for controlling progress for a simple scalar value
   * @param prefixMessage Message to prefix the value with 
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
