import { AndroidRepository } from "../../src/repositories/android";
import * as fs from "fs";
import * as ncp from "ncp";

import { CheckPoint } from "../../src/models/checkpoint";
import * as sinon from "sinon";
import { expect } from "chai";

describe("android folder repository", () => {
  it("should return correct backup location on copy()", async () => {
    //Setup
    var now = new Date(2020, 1, 1, 1, 1, 1, 1);
    var clock = sinon.useFakeTimers(now.getTime());
    const checkpoint = new CheckPoint("mock", "mock");

    const mkdirStub = sinon.stub(fs,"mkdir");
    mkdirStub.callsArg(1)

    const ncpStub = sinon.stub(ncp,"ncp");
    ncpStub.callsArg(2)
    const repo = new AndroidRepository("mock", checkpoint);

    //Act
    const backupLocation = await repo.copy("mock/path");

    //Assert
    expect(backupLocation).to.equal("mock/path/mock-2020-01-31T12:01:01.001Z-droid-up");

    //Reset
    clock.restore();
    mkdirStub.restore();
    ncpStub.restore();
  });
});
