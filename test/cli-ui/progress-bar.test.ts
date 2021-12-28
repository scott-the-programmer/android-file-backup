import { ProgressBar } from "../../src/cli-ui/progress-bar";
import { expect } from "chai";

describe("progress bar tests", () => {
  it("should increment progress", () => {
    //Setup
    const progressBar = new ProgressBar(100);
    progressBar.start();

    //Act
    progressBar.incrementProgress();

    //Assert
    expect(progressBar.getProgressBar().value).to.be.equal(1);

    progressBar.getProgressBar().stop();
  });

  it("should throw error on negative value", () => {
    //Setup & Act & Assert
    expect(() => new ProgressBar(-1)).to.throw("Invalid target value");
  });

  it("should complete without error", async () => {
    //Setup
    const progressBar = new ProgressBar(100);
    progressBar.start();

    //Act
    await progressBar.complete(0);

    //Assert
    expect(progressBar.getProgressBar().value).to.be.equal(100);
  });
});
