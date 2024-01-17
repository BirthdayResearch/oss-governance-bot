import {Config} from '../config'
import {initClient} from '../github'
import * as core from '@actions/core'
import * as github from '@actions/github'

async function pocOctok(config: Config) {
  core.info('Starting pocOtctok')
  const client = initClient()

  if (config.issue) {
    core.info('Handling issue')
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
  }

  if (config.pull_request) {
    core.info('Handling PR')
  }

  core.info('Completed pocOtctok')
  return true
}

export default async function (config: Config): Promise<any> {
  await pocOctok(config)
}
