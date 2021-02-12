import {Label} from '../config'
import {Commands} from '../command'
import {difference} from 'lodash'
import {addLabels, getLabels, postComment, removeLabels} from '../github'

async function updateLabels(labels: string[]): Promise<void> {
  const removes = getLabels().filter(name => {
    return !labels.includes(name)
  })

  await addLabels(labels)
  await removeLabels(removes)
}

export default async function (
  label: Label,
  commands: Commands
): Promise<void> {
  function needs() {
    const needCommands = [
      ...commands.prefix(`/needs ${label.prefix}`),
      ...commands.prefix(`/need ${label.prefix}`)
    ]

    if (needCommands.length) {
      return true
    }

    return !!label.needs
  }

  function computeLabels(): string[] {
    let labels = getLabels()

    labels = difference(labels, [`needs/${label.prefix}`])

    for (const remove of commands.prefix(`/${label.prefix}-remove`)) {
      const removals = remove.args.map(value => `${label.prefix}/${value}`)
      labels = difference(labels, removals)
    }

    for (const add of commands.prefix(`/${label.prefix}`)) {
      labels.push(...add.args.map(value => `${label.prefix}/${value}`))
    }

    if (label.multiple === false && labels.length) {
      labels = [labels[labels.length - 1]]
    }

    if (needs() && labels.length === 0) {
      labels = [`needs/${label.prefix}`]
    }

    return labels
  }

  const labels = computeLabels()
  await updateLabels(labels)

  // Post comment if needs.comment is available
  if (
    labels.includes(`needs/${label.prefix}`) &&
    typeof label.needs !== 'boolean'
  ) {
    const comment = label.needs?.comment
    if (comment) {
      await postComment(comment)
    }
  }
}
