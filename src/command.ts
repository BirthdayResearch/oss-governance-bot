import * as github from '@actions/github'

export class Command {
  public readonly text: string

  public readonly cmd: string
  public readonly args: string[]

  constructor(text: string) {
    this.text = text

    const strings = text.split(' ')
    this.cmd = strings[0]
    this.args = strings.slice(1)
  }
}

export class Commands {
  private commands: Command[]

  constructor(commands: Command[]) {
    this.commands = commands
  }

  prefix(cmd: string): Command[] {
    return this.commands.filter(command => {
      return command.text.startsWith(cmd)
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
