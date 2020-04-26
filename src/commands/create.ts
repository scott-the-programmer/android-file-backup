import { Command, flags } from "@oclif/command";
import { CreateController } from "../controllers/create-controller";
import cli from "cli-ux";

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
    const controller = new CreateController(flags.source!, flags.target!);

    await controller.setup();
    const fileCount = await controller.getFileCount();

    const bar = this.setupLoadingBar(fileCount);

    try {
      await controller.createBackup(() => {
        this.updateLoadingBar(bar);
      });
    } catch (e) {
      this.log(e);
    }

    await this.completeLoadingBar(bar);
  }

  private setupLoadingBar(targetValue: number) {
    const bar = cli.progress({
      format: "[{bar}] | {value}/{total}",
      fps: 100,
      synchronousUpdate: true,
    });

    bar.start(targetValue, 0);

    return bar;
  }

  private updateLoadingBar(bar: any): void {
    bar.increment();
  }

  private async completeLoadingBar(bar: any): Promise<void> {
    //Wait 1s for the bar to fully render
    await new Promise(resolve => setTimeout(resolve, 1000));
    bar.stop();
    await new Promise(resolve => setTimeout(resolve, 1000));
    bar.update(bar.getTotal());
  }
}
