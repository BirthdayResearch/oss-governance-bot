import {LabelChatOps} from '../config'
import {Commands} from '../command'
import {addLabels, removeLabels} from '../github'

export default async function (
  chatOps: LabelChatOps,
  commands: Commands
): Promise<void> {
  const matched = commands.prefix(chatOps.cmd)
  if (!matched.length) {
    return
  }

  const add = chatOps.label?.add

  if (typeof add === 'string') {
    await addLabels([add])
  }
  if (Array.isArray(add)) {
    await addLabels(add)
  }

  const remove = chatOps.label?.remove

  if (typeof remove === 'string') {
    await removeLabels([remove])
  }
  if (Array.isArray(remove)) {
    await removeLabels(remove)
  }
}
