import {getInput, error as core_error, setFailed} from '@actions/core'
import {getOctokit, context} from '@actions/github'
import {getConfig} from './config'

const githubToken = getInput('github-token')
const configPath = getInput('config-path', {required: true})

const client = getOctokit(githubToken)
const payload = context.payload.pull_request || context.payload.issue

if (!payload?.number) {
  throw new Error(
    'Could not get issue_number from pull_request or issue from context'
  )
}

/* eslint github/no-then: off */
getConfig(client, configPath)
  .then(config => {
    return Promise.all([config])
  })
  .catch(error => {
    core_error(error)
    setFailed(error.message)
  })
