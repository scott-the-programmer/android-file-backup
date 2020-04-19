import * as fs from "fs";

import { CheckPoint } from "../../src/models/checkpoint";
import * as sinon from "sinon";
import { expect } from "chai";
import { MetadataRepository } from '../../src/repositories/metadata';

describe("metadata file repository", () => {
  it("should return the correct checkpoint path", async () => {
    //Setup
    const checkpoint = new CheckPoint("mock", "mock");

    const writeFileStub = sinon.stub(fs,"writeFile");
    writeFileStub.callsArg(2)
    const repo = new MetadataRepository();

    //Act
    const checkpointLocation = await repo.createFile(checkpoint,"mock/path");

    //Assert
    expect(checkpointLocation).to.equal("mock/path/checkpoint.json");

    //Reset
    writeFileStub.restore();
  });
});
