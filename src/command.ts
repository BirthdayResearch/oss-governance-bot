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
    super(text)

    const postfix = this.text.split(prefix)[1]
    if (postfix) {
      this.args = postfix.trim().split(' ')
    }
  }
}

export class Commands {
  private commands: Command[]

  constructor(commands: Command[]) {
    this.commands = commands
  }

  prefix(start: string): ArgsCommand[] {
    return this.commands
      .filter(command => {
        return command.text.startsWith(start)
      })
      .map(value => {
        return new ArgsCommand(value.text, start + ' ')
      })
  }
}

export function getCommands(): Command[] {
  const payload = github.context.payload
  const content = payload.comment || payload.pull_request || payload.issue

  let body: string = content?.body || ''
  // Replace comments so that it's not processed
  body = body.replace(/<!--(.|\n)*-->/, '')

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
