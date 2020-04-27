import { AndroidRepository } from "../../src/repositories/android";
import * as fs from "fs";
import * as path from "path";
import { CheckPoint } from "../../src/models/checkpoint";
import * as sinon from "sinon";
import { expect } from "chai";

describe("android folder repository", () => {
  it("should return correct backup location on copy()", async () => {
    //Setup
    var clock = sinon.useFakeTimers(1580472061001);
    const checkpoint = new CheckPoint("mock", "mock");

    const mkdirStub = sinon.stub(fs, "mkdir");
    mkdirStub.callsArg(2);

    const fsCopySyncStub = sinon.stub(fs,"copyFileSync");
    fsCopySyncStub.callsFake(()=>{})

    const pathStub = sinon.stub(path, "resolve").callsFake((arg) => arg);

    const repo = new AndroidRepository("mock", checkpoint);
    const mockFiles = ["mock/path/file1", "mock/path/file2", "mock/path/file3"];
    const globStub = sinon.stub(repo, "getFiles").callsFake(() => {
      return new Promise((resolve, reject) => {
        resolve(mockFiles);
      });
    });

    //Act
    const backupLocation = await repo.copy("mock/path");

    //Assert
    expect(backupLocation).to.equal("mock/path/mock-1580472061001-droid-up");

    //Reset
    clock.restore();
    mkdirStub.restore();
    globStub.restore();
    pathStub.restore();
    fsCopySyncStub.restore();
  });

  it("should return correct file count", async () => {
    //Setup
    var now = new Date(2020, 1, 1, 1, 1, 1, 1);
    var clock = sinon.useFakeTimers(now.getTime());
    const checkpoint = new CheckPoint("mock", "mock");

    const mkdirStub = sinon.stub(fs, "mkdir");
    mkdirStub.callsArg(2);

    const repo = new AndroidRepository("mock", checkpoint);
    const mockFiles = ["mock/path/file1", "mock/path/file2", "mock/path/file3"];
    const globStub = sinon.stub(repo, "getFiles").callsFake(() => {
      return new Promise((resolve, reject) => {
        resolve(mockFiles);
      });
    });

    //Act
    const fileCount = await repo.getFileCount();

    //Assert
    expect(fileCount).to.equal(3);

    //Reset
    clock.restore();
    mkdirStub.restore();
    globStub.restore();
  });
});
