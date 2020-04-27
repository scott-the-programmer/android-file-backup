import cli from "cli-ux";

export class ProgressBar {
  _bar: any;
  _targetValue: number;

  /**
   * Responsible for creating and controlling the CLI progress bar
   * @param targetValue value to progress towards
   */
  constructor(targetValue: number) {
    if (targetValue < 0) {
      throw new Error("Invalid target value");
    }

    this._targetValue = targetValue;
    this._bar = cli.progress({
      format: "PROGRESS [{bar}] | {value}/{total}",
      fps: 100,
      synchronousUpdate: true,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
    });
  }

  /**
   * Starts the progress bar
   */
  start(): void {
    this._bar.start(this._targetValue, 0);
  }

  /**
   * Increments progress by 1
   */
  incrementProgress(): void {
    this._bar.increment();
  }

  /**
   * Completes the progress bar, setting the current value to the target value
   * @param delay (Optional) delay in ms when completing the progress bar. Defaults to 2000ms (2 seconds)
   */
  async complete(delay:number = 2000): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, delay * 0.5));
    this._bar.update(this._targetValue);
    await new Promise((resolve) => setTimeout(resolve, delay * 0.5));
    this._bar.stop();
  }

  /**
   * Returns the internal progess bar object (cli-ux/progress)
   */
  getProgressBar(): any {
    return this._bar;
  }
}
