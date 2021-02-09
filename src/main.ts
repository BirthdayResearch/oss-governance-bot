import * as core from '@actions/core'
import * as github from '@actions/github'
import {getConfig} from './config'

const githubToken = core.getInput('github-token')
const configPath = core.getInput('config-path', {required: true})

const client = github.getOctokit(githubToken)
const payload =
  github.context.payload.pull_request || github.context.payload.issue

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
    core.error(error)
    core.setFailed(error.message)
  })
