import * as github from '@actions/github'

function is(eventName: string, actions: string[]): boolean {
  return (
    github.context.eventName === eventName &&
    actions.includes(github.context.payload.action!)
  )
}

/**
 * To prevent mistakes, this will ignore invalid workflow trigger
 */
export default async function (): Promise<boolean> {
  const payload = github.context.payload

  // Ignore Non 'User' to prevent infinite loop
  if (payload.sender?.type !== 'User') {
    return true
  }

  if (is('issue_comment', ['created'])) {
    return false
  }

  if (is('pull_request', ['synchronize', 'opened', 'labeled', 'unlabeled'])) {
    return false
  }

  if (is('issues', ['opened', 'labeled', 'unlabeled'])) {
    return false
  }

  return true
}

export function isCreatedOpened(): boolean {
  if (is('issue_comment', ['created'])) {
    return true
  }

  if (is('pull_request', ['opened'])) {
    return true
  }

  if (is('issues', ['opened'])) {
    return true
  }

  return false
}
