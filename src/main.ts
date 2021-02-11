import * as core from '@actions/core'
import * as github from '@actions/github'
import {Config, getConfig, Governance} from './config'
import ignore from './ignore'

const client = github.getOctokit(core.getInput('github-token'))
const configPath = core.getInput('config-path', {required: true})

export async function getGovernance(): Promise<Governance | undefined> {
  const config: Config = await getConfig(client, configPath)

  if (github.context.payload.issue) {
    return config.issue
  }

  if (github.context.payload.pull_request) {
    return config['pull-request']
  }

  throw new Error('Could not get pull_request or issue from context')
}

/* eslint github/no-then: off */
ignore()
  .then(async ignore => {
    if (ignore) return

    const governance = await getGovernance()
    return Promise.all([governance])
  })
  .then(() => {
    core.info('oss-governance: completed')
  })
  .catch(error => {
    core.error(error)
    core.setFailed(error.message)
  })
