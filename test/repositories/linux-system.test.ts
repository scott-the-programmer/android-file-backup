import { LinuxSystemRepository } from "../../src/repositories/system";
import { expect } from "@oclif/test";

describe("linux system repository", () => {
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
});
