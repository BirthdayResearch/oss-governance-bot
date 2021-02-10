import * as core from '@actions/core'
import * as github from '@actions/github'
import {getConfig} from './config'
import ignore from './ignore'

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
    return Promise.all([ignore()])
  })
  .then(() => {
    core.info('oss-governance: completed')
  })
  .catch(error => {
    core.error(error)
    core.setFailed(error.message)
  })

// 1. parse config
// 2. ignores (bots/workflow)
// TODO(fuxing): 3. parse chat-ops (access-control)
// TODO(fuxing): 4. run chat-ops (types)
// TODO(fuxing): 5. produce prefixed labels (add/remove)
// TODO(fuxing): 6. produce needs labels
// TODO(fuxing): 7. produce comments + generate available commands
