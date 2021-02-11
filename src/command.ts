import * as github from '@actions/github'

export class Command {
  public readonly text: string
  public readonly args: string[] = []

  constructor(text: string) {
    this.text = text
  }

  getArgs(prefix: string): string[] {
    const postfix = this.text.split(prefix)[1]
    return postfix.trim().split(' ')
  }
}

export class ArgsCommand extends Command {
  public readonly args: string[] = []

  constructor(text: string, prefix: string) {
    super(text);

    const postfix = this.text.split(prefix)[1]
    this.args = postfix.trim().split(' ')
  }
}

export class Commands {
  private commands: Command[]

  constructor(commands: Command[]) {
    this.commands = commands
  }

  prefix(text: string): ArgsCommand[] {
    return this.commands.filter(command => {
      return command.text.startsWith(text)
    }).map(value => {
      return new ArgsCommand(value.text, text)
    })
  }
}

export function getCommands(): Command[] {
  const payload = github.context.payload
  const content = payload.comment || payload.pull_request || payload.issue
  const body: string = content?.body

  return body
    .split('\n')
    .map(text => /^\/(.+)/.exec(text)?.[0])
    .filter((cmd): cmd is string => !!cmd)
    .map(value => new Command(value))
}

export default async function (): Promise<Commands> {
  const commands = getCommands()
  return new Commands(commands)
}
