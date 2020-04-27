export abstract class Progress {
  protected _progress: any;

  /**
   * Used for implementing Progress-like functionality
   * @param progress a cli-ux progress object
   */
  constructor(progress:any) {
    this._progress = progress;
  }

  /**
   * Starts the progress bar
   */
  start(): void {
    this._progress.start(0);
  }

  /**
   * Increments progress by 1
   */
  incrementProgress(): void {
    this._progress.increment();
  }

  async complete(delay: number = 2000): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, delay * 0.5));
    this._progress.stop();
  }

  /**
   * Returns the internal progess bar object (cli-ux/progress)
   */
  getProgressBar(): any {
    return this._progress;
  }
}
