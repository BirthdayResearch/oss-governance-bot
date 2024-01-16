import {Config} from '../config'
import autoAssignAnyFrom from '../automations/assignAnyFrom'
import {initClient} from '../github'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { debug } from 'console'

async function processAutomations(config: Config) {
  const possibleAssignees = config.issue?.automations?.autoAssignAnyFrom ?? [
    '@'.concat(github.context.repo.owner)
  ]
  core.info(
    '    > autoAssign Posibilities: '.concat(JSON.stringify(possibleAssignees))
  )
  await autoAssignAnyFrom(possibleAssignees)
}

async function pocOctok() {
  core.info('github-client: addLabels')
  const client = initClient()

  client.issues
    .listForRepo({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      state: 'open'
    })
    // eslint-disable-next-line github/no-then
    .then(async issuesList => {
      core.debug(issuesList)
      return true
    })
    // eslint-disable-next-line github/no-then
    .catch(error => {
      core.error(error)
      core.setFailed(error)
    })

  return true
}

export default async function (config: Config): Promise<any> {
  await processAutomations(config)
  await pocOctok()
}
