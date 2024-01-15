import * as core from '@actions/core'
import {assign} from '../../github'

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

  core.debug('about to assign'.concat(JSON.stringify(assignees)))

  await assign(assignees)
}
