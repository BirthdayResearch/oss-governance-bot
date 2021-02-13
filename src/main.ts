import * as core from '@actions/core'
import * as github from '@actions/github'
import {Config, getConfig, Governance} from './config'
import ignore from './ignore'
import command from './command'
import operations from './operations'
import {initClient} from './github'

export async function getGovernance(): Promise<Governance | undefined> {
  const configPath = core.getInput('config-path', {required: true})
  const config: Config = await getConfig(initClient(), configPath)

  if (github.context.payload.comment) {
    if (github.context.payload.issue?.pull_request) {
      return config.pull_request
    }

    if (github.context.payload.issue) {
      return config.issue
    }
  }

  if (github.context.payload.issue) {
    return config.issue
  }

  if (github.context.payload.pull_request) {
    return config.pull_request
  }

  throw new Error('Could not get pull_request or issue from context')
}

export async function runGovernance(): Promise<void> {
  const governance = await getGovernance()
  if (!governance) {
    return
  }

  const commands = await command()
  await operations(governance, commands)
  core.info('oss-governance: completed')
}

/* eslint github/no-then: off */
ignore()
  .then(async toIgnore => {
    if (toIgnore) return

    await runGovernance()
  })
  .catch(error => {
    core.error(error)
    core.setFailed(error.message)
  })
