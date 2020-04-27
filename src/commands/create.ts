import { Command, flags } from "@oclif/command";
import { CreateController } from "../controllers/create-controller";
import { ProgressBar } from "../cli-ui/progress-bar";

export default class Create extends Command {
  static description = "create a backup given a source and target location";

  static examples = [
    `$ droid-up create --source path/to/android --target /path/to/backup`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    source: flags.string({
      char: "s",
      description: "android device file location",
    }),
    target: flags.string({ char: "t", description: "backup location" }),
  };

  static args = [{ name: "file" }];

  async run() {
    const { flags } = this.parse(Create);

    this.log("Feeding the hamsters...")
    //Setting up backup
    const controller = new CreateController(flags.source!, flags.target!);
    await controller.setup();
    const fileCount = await controller.getFileCount();
    const progressBar = new ProgressBar(fileCount);

    this.log("Initiating backup...")

    let backupLocation:string = "";
    try {
      progressBar.start();
      backupLocation = await controller.createBackup(() => {
        progressBar.incrementProgress();
      });
      await progressBar.complete();
    } catch (e) {
      this.log(e);
    }
    this.log("Backup complete!")
    this.log(`Your backup can be found under ${backupLocation}`)
  }
}
