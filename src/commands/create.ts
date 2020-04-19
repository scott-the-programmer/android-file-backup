import {Command, flags} from '@oclif/command'

export default class Create extends Command {
  static description = 'create a backup given a source and target location'

  static examples = [
    `$ droid-up create --source path/to/android --target /path/to/backup`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    source: flags.string({char: 's', description: 'android device file location'}),
    target: flags.string({char: 't', description: 'backup location'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Create)
    this.log(`${args.source}`)
  }
}
