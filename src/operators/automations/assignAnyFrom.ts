import * as core from '@actions/core'
import {assign, getNumber} from '../../github'

export default async function (assigneesList: string[]): Promise<void> {
  if (!assigneesList.length) {
    return
  }

  const assignees: string[] = assigneesList
    .map(value => {
      value = value.trim()
      if (value.startsWith('@')) {
        return value.replace(/^@/, '')
      }
    })
    .filter(value => value) as string[]

  const assigneeIndex = (getNumber() ?? 0) % assignees.length

  core.debug(''.concat('Index ', assigneeIndex.toString(), ' // About to assign', assignees[assigneeIndex]))
  await assign([assignees[assigneeIndex]])
}
