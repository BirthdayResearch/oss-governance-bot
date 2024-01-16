import {Config} from '../config'
import autoAssignAnyFrom from '../automations/assignAnyFrom'
import * as core from '@actions/core'
import * as github from '@actions/github'

async function processAutomations(config: Config) {
  const possibleAssignees = config.issue?.automations?.autoAssignAnyFrom ?? [
    '@'.concat(github.context.repo.owner)
  ]
  core.info(
    '    > autoAssign Posibilities: '.concat(JSON.stringify(possibleAssignees))
  )
  await autoAssignAnyFrom(possibleAssignees)
}

export default async function (config: Config): Promise<any> {
  await processAutomations(config)
}
