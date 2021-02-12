import {ChatOps} from '../config'
import {Commands} from '../command'
import {patchIssue} from '../github'

export default async function (
  chatOps: ChatOps,
  commands: Commands
): Promise<void> {
  const matched = commands.prefix(chatOps.cmd)
  if (!matched.length) {
    return
  }

  await patchIssue({
    state: 'closed'
  })
}
