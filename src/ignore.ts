import {Config} from './config'
import * as github from '@actions/github'

function is(eventName: string, actions: string[]): boolean {
  return github.context.eventName === eventName && actions.includes(github.context.action)
}

/**
 * To prevent mistakes, this will ignore invalid workflow trigger
 *
 * @param config
 */
export default async function (config: Config): Promise<boolean> {
  const payload = github.context.payload

  // Ignore Non 'User' to prevent infinite loop
  if (payload.sender?.type !== 'User') {
    return true
  }

  if (is('issue_comment', ['created'])) {
    return false
  }

  if (is('pull_request', ["opened", "labeled", "unlabeled"])) {
    return false
  }

  if (is('issues', ["opened", "labeled", "unlabeled"])) {
    return false
  }

  return true
}
