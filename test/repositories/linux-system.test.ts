import { LinuxSystemRepository, folderModule } from "../../src/repositories/system";
import { expect } from "@oclif/test";
import * as sinon from "sinon";

describe("linux system repository", () => {
  it("should return correct inferred device name with child folders", async () => {
    //Setup
    const linuxRepository = new LinuxSystemRepository();
    const filePath = "/run/user/1000/gvfs/mtp:host=Mock_Device/Phone/Folder";

    //Act
    const device = await linuxRepository.getDriveName(filePath);

    //Assert
    expect(device).to.be.equal("Mock_Device");
  });

  it("should return correct inferred device name", async () => {
    //Setup
    const linuxRepository = new LinuxSystemRepository();
    const filePath = "/run/user/1000/gvfs/mtp:host=Mock_Device";

    //Act
    const device = await linuxRepository.getDriveName(filePath);

    //Assert
    expect(device).to.be.equal("Mock_Device");
  });

  it("should return correct default device name", async () => {
    //Setup
    const linuxRepository = new LinuxSystemRepository();
    const filePath = "/run/user/1000/gvfs/device";

    //Act
    const device = await linuxRepository.getDriveName(filePath);

    //Assert
    expect(device).to.be.equal("android-device");
  });

  it("should return correct default device name if it cant parse mtp:host", async () => {
    //Setup
    const linuxRepository = new LinuxSystemRepository();
    const filePath = "/run/user/1000/gvfs/mtp:host=";

    //Act
    const device = await linuxRepository.getDriveName(filePath);

    //Assert
    expect(device).to.be.equal("android-device");
  });


  it("should return a number when getting the folder size", async () => {
    //Setup
    const getSizeStub = sinon.stub(folderModule,"getSize");
    getSizeStub.callsArgWith(1,null,3)
    const linuxRepository = new LinuxSystemRepository();

    //Act
    const size = await linuxRepository.getFolderSize("mock")

    //Assert
    expect(size).to.equal(3);

    //Restore
    getSizeStub.restore();
  });
});
