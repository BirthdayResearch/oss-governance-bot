import * as github from '@actions/github'
import * as core from '@actions/core'
import {GitHub} from '@actions/github/lib/utils'

export function initClient(
  token: string = core.getInput('github-token')
): InstanceType<typeof GitHub> {
  return github.getOctokit(token)
}

export async function getBotUserId(): Promise<number> {
  const client = initClient(core.getInput('bot-token'))
  const user = await client.users.getAuthenticated()
  return user.data.id
}

function getNumber(): number | undefined {
  return (
    github.context.payload.pull_request?.number ||
    github.context.payload.issue?.number
  )
}

export function getLabels(): string[] {
  const contents =
    github.context.payload.pull_request || github.context.payload.issue
  return contents?.labels?.map(({name}: {name: string}) => name) || []
}

export async function addLabels(labels: string[]): Promise<void> {
  if (!labels.length) return

  const client = initClient(core.getInput('bot-token'))

  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: getNumber()!,
    labels: labels
  })
}

export async function removeLabels(labels: string[]): Promise<void> {
  if (!labels.length) return

  const client = initClient(core.getInput('bot-token'))

  await Promise.all(
    labels.map(name =>
      client.issues.removeLabel({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: getNumber()!,
        name: name
      })
    )
  )
}

/**
 * Comment details.
 */
function getDetails(): string {
  const repository = github.context.payload.repository

  const configPath = core.getInput('config-path', {required: true})
  const repoUrl = repository?.html_url
  const owner = repository?.owner
  const branch = repository?.default_branch

  let details = ''
  details += '\n'
  details += '<details><summary>Details</summary>'
  details += '\n\n'

  if (owner?.type === 'Organization') {
    details += `I am a bot created to help the [${owner?.login}](${owner?.html_url}) developers manage community feedback and contributions.`
  } else {
    details += `I am a bot created to help [${owner?.login}](${owner?.html_url}) manage community feedback and contributions.`
  }

  details += ' '
  details += `You can check out my [manifest file](${repoUrl}/blob/${branch}/${configPath}) to understand my behavior and what I can do.`
  details += ' '
  details +=
    'If you want to use this for your project, you can check out the [DeFiCh/oss-governance](https://github.com/DeFiCh/oss-governance) repository.'
  details += '\n\n'
  details += '</details>'
  return details
}

function getIssueUserLogin(): string | undefined {
  if (github.context.payload.issue) {
    return github.context.payload.issue.user?.login
  }
  if (github.context.payload.pull_request) {
    return github.context.payload.pull_request.user?.login
  }
}

/**
 * Comment to post with added details.
 *
 * @param body comment
 */
export async function postComment(body: string) {
  const client = initClient(core.getInput('bot-token'))

  body = body.replace('$AUTHOR', github.context.payload.sender?.login)
  body = body.replace('$ISSUE_AUTHOR', getIssueUserLogin()!)
  body += getDetails()

  await client.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: getNumber()!,
    body: body
  })
}

export async function patchIssue(changes: any) {
  const client = initClient(core.getInput('bot-token'))

  await client.issues.update({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: getNumber()!,
    ...changes
  })
}

export async function assign(assignees: string[]) {
  if (!assignees.length) return

  const client = initClient(core.getInput('bot-token'))

  await client.issues.addAssignees({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: getNumber()!,
    assignees: assignees
  })
}

export async function requestReviewers(reviewers: string[]) {
  if (!reviewers.length) return

  const client = initClient(core.getInput('bot-token'))

  await client.pulls.requestReviewers({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: getNumber()!,
    reviewers: reviewers
  })
}

export async function commitStatus(
  context: string,
  state: 'success' | 'failure' | 'pending',
  description?: string,
  url?: string
): Promise<void> {
  const client = initClient()

  async function sendStatus(sha: string) {
    await client.repos.createCommitStatus({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      sha: sha,
      context: context,
      state: state,
      description: description,
      target_url: url
    })
  }

  if (github.context.payload.pull_request) {
    await sendStatus(github.context.payload.pull_request?.head.sha as string)
    return
  }

  if (
    github.context.payload.comment &&
    github.context.payload.issue?.pull_request
  ) {
    const response = await client.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: getNumber()!
    })

    await sendStatus(response.data.head.sha)
  }
}

export async function hasReleaseByTag(tag: string): Promise<boolean> {
  const client = initClient()

  const release = client.repos.getReleaseByTag({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    tag: tag
  })

  return release.then(() => true).catch(() => false)
}
