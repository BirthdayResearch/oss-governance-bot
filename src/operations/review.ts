import {ChatOps} from '../config'
import {Commands} from '../command'
import {requestReviewers} from '../github'

export default async function (
  chatOps: ChatOps,
  commands: Commands
): Promise<void> {
  const matched = commands.prefix(chatOps.cmd)
  if (!matched.length) {
    return
  }

  const reviewers: string[] = matched
    .flatMap(value => value.args)
    .map(value => {
      value = value.trim()
      if (value.startsWith('@')) {
        return value.replace(/^@/, '')
      }
    })
    .filter(value => value) as string[]

  await requestReviewers(reviewers)
}
