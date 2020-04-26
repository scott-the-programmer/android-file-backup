import { ProgressBar } from "../../src/cli-ui/progress-bar";
import { expect } from "chai";

describe("progress bar tests", () => {
  it("should increment progress", async () => {
    //Setup
    const progressBar = new ProgressBar(100);

    //Act
    progressBar.incrementProgress();

    //Assert
    expect(progressBar.getProgressBar().value).to.be.equal(1);

    progressBar.getProgressBar().stop();
  });

  it("should throw error on negative value", async () => {
    //Setup & Act & Assert
    expect(()=> new ProgressBar(-1)).to.throw("Invalid target value");
  });
});
