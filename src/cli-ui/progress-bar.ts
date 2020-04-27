import cli from "cli-ux";
import { Progress } from "./progress";

export class ProgressBar extends Progress {
  protected _targetValue: number;

  /**
   * Responsible for creating and controlling the CLI progress bar
   * @param targetValue value to progress towards
   */
  constructor(targetValue: number) {
    super(
      cli.progress({
        format: "PROGRESS [{bar}] | {value}/{total}",
        fps: 100,
        synchronousUpdate: true,
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
      })
    );

    if (targetValue < 0) {
      throw new Error("Invalid target value");
    }

    this._targetValue = targetValue;
  }

  /**
   * Starts the progress bar
   */
  start(): void {
    this._progress.start(this._targetValue, 0);
  }

  /**
   * Completes the progress bar, setting the current value to the target value
   * @param delay (Optional) delay when completing the progress bar. Defaults
   */
  async complete(delay: number = 2000): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, delay * 0.5));
    this._progress.update(this._targetValue);
    await new Promise((resolve) => setTimeout(resolve, delay * 0.5));
    this._progress.stop();
  }
}
