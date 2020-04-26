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
      format: "[{bar}] | {value}/{total}",
      fps: 100,
      synchronousUpdate: true,
    });
    this._bar.start(targetValue, 0);
  }

  /**
   * Increments progress by 1
   */
  incrementProgress(): void {
    this._bar.increment();
  }

  /**
   * Completes the progress bar, setting the current value to the target value
   */
  async completeLoadingBar(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._bar.stop();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._bar.update(this._targetValue);
  }

  /**
   * Returns the internal progess bar object (cli-ux/progress)
   */
  getProgressBar(): any {
    return this._bar;
  }
}
