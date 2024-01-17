import * as core from '@actions/core'
import * as github from '@actions/github'
import {Config, getConfig, Governance} from './config'
import ignore from './rules/ignore'
import command from './command'
import operations from './operators'
import schedules from './schedules'
import {initClient} from './github'

/**
 * @return the current governance config based on the context, it could be 'pull_request' or 'issue'.
 */
export async function getGovernance(): Promise<Governance | undefined> {
  const configPath = core.getInput('config-path', {required: true})
  const config: Config = await getConfig(initClient(), configPath)
  core.debug('Config is: ')
  core.debug(JSON.stringify(config))
  core.debug('Context is: ')
  core.debug(JSON.stringify(github.context))

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

/**
 * Get governance config, parse and run commands from context.
 */
export async function runGovernance(): Promise<void> {
  const governance = await getGovernance()
  core.info('main: fetched governance.yml')

  if (!governance) {
    return
  }

  core.info('main: parsing commands')
  const commands = await command()

  core.info('main: running operations')
  await operations(governance, commands)
  core.info('main: completed operations')
}

/**
 * Get governance config, parse and run commands from context.
 */
export async function runSchedules(): Promise<void> {
  const configPath = core.getInput('config-path', {required: true})
  const config: Config = await getConfig(initClient(), configPath)

  core.info('main: running schedules')
  await schedules(config)
  core.info('main: completed schedules')
}

/* eslint github/no-then: off */
ignore()
  .then(async toIgnore => {
    if (toIgnore) return

    if (github.context.eventName === 'schedule') {
      await runSchedules()
    } else {
      await runGovernance()
    }
  })
  .catch(error => {
    core.error(error)
    core.setFailed(error)
  })
