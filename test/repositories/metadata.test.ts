import * as fs from "fs";

import { CheckPoint } from "../../src/models/checkpoint";
import * as sinon from "sinon";
import { expect } from "chai";
import { MetadataRepository } from "../../src/repositories/metadata";

afterEach(() => {
	sinon.restore();
      });

describe("metadata file repository", () => {
  it("should return the correct checkpoint path", async () => {
    //Setup
    const checkpoint = new CheckPoint("mock", "mock");

    const writeFileStub = sinon.stub(fs, "writeFile");
    writeFileStub.callsArg(2);
    const repo = new MetadataRepository();

    //Act
    const checkpointLocation = await repo.createFile(checkpoint, "mock/path");

    //Assert
    expect(checkpointLocation).to.equal("mock/path/checkpoint.json");
  });

  it("should fail on error", (done) => {
    //Setup
    const checkpoint = new CheckPoint("mock", "mock");

    const writeFileStub = sinon.stub(fs, "writeFile");
    writeFileStub.yields(new Error("mock error"));
    const repo = new MetadataRepository();

    //Act & Assert
    repo
      .createFile(checkpoint, "mock/path")
      .catch((err) => {
        expect(err.message).to.be.equal("mock error");
        writeFileStub.restore();
      })
      .finally(() => {
        done();
      });
  });
});
