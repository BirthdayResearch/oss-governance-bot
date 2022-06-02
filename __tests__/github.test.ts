import {commitStatus, postComment} from '../src/github'
import * as core from '@actions/core'
import * as github from '@actions/github'
import nock from 'nock'

const postComments = jest.fn()
const getPulls = jest.fn()
const postStatus = jest.fn()

beforeAll(() => {
  jest.spyOn(core, 'getInput').mockImplementation(name => {
    return 'config-path/location.yml'
  })

  jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
    return {
      owner: 'owner',
      repo: 'repo'
    }
  })

  nock('https://api.github.com')
    .post('/repos/owner/repo/issues/1/comments')
    .reply(200, function (_, body) {
      postComments(body)
      return {}
    })
    .persist()

  nock('https://api.github.com')
    .get('/repos/owner/repo/pulls/1')
    .reply(200, function (_, body) {
      getPulls()
      return {
        head: {
          sha: 'abc'
        }
      }
    })
    .persist()

  nock('https://api.github.com')
    .post(/\/repos\/owner\/repo\/statuses\/.+/)
    .reply(200, function (_, body) {
      postStatus(body)
      return {}
    })
    .persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

it('pull_request should comment as expected', async () => {
  github.context.payload = {
    pull_request: {
      number: 1,
      labels: []
    }
  }

  await postComment('a')
  await expect(postComments).toBeCalled()
})

it('issue should comment as expected', async () => {
  github.context.payload = {
    issue: {
      number: 1,
      labels: []
    }
  }

  await postComment('a')
  await expect(postComments).toBeCalled()
})

it('Organization: should format details as expected', async () => {
  github.context.payload = {
    issue: {
      number: 1,
      labels: []
    },
    repository: {
      name: 'Hello-World',
      owner: {
        login: 'Codertocat',
        html_url: 'https://github.com/Codertocat/',
        type: 'Organization'
      },
      default_branch: 'main',
      html_url: 'https://github.com/Codertocat/Hello-World'
    }
  }

  await postComment('a')
  await expect(postComments).toHaveBeenCalledWith({
    body:
      'a' +
      '\n' +
      '<details><summary>Details</summary>' +
      '\n\n' +
      'I am a bot created to help the [Codertocat](https://github.com/Codertocat/) developers manage community feedback and contributions. You can check out my [manifest file](https://github.com/Codertocat/Hello-World/blob/main/config-path/location.yml) to understand my behavior and what I can do. If you want to use this for your project, you can check out the [BirthdayResearch/oss-governance-bot](https://github.com/BirthdayResearch/oss-governance-bot) repository.' +
      '\n\n' +
      '</details>'
  })
})

it('User: should format details as expected', async () => {
  github.context.payload = {
    issue: {
      number: 1,
      labels: []
    },
    repository: {
      name: 'Hello-World',
      owner: {
        login: 'Codertocat',
        html_url: 'https://github.com/Codertocat/',
        type: 'User'
      },
      default_branch: 'main',
      html_url: 'https://github.com/Codertocat/Hello-World'
    }
  }

  await postComment('b')
  await expect(postComments).toHaveBeenCalledWith({
    body:
      'b' +
      '\n' +
      '<details><summary>Details</summary>' +
      '\n\n' +
      'I am a bot created to help [Codertocat](https://github.com/Codertocat/) manage community feedback and contributions. You can check out my [manifest file](https://github.com/Codertocat/Hello-World/blob/main/config-path/location.yml) to understand my behavior and what I can do. If you want to use this for your project, you can check out the [BirthdayResearch/oss-governance-bot](https://github.com/BirthdayResearch/oss-governance-bot) repository.' +
      '\n\n' +
      '</details>'
  })
})

describe('commit status', () => {
  it('should resolve head.sha if not available', async () => {
    github.context.payload = {
      comment: {
        id: 1
      },
      issue: {
        number: 1,
        pull_request: {
          diff_url:
            'https://github.com/BirthdayResearch/oss-governance-bot/pull/9.diff',
          html_url:
            'https://github.com/BirthdayResearch/oss-governance-bot/pull/9',
          patch_url:
            'https://github.com/BirthdayResearch/oss-governance-bot/pull/9.patch',
          url:
            'https://api.github.com/repos/BirthdayResearch/oss-governance-bot/pulls/9'
        }
      }
    }

    await commitStatus('Hey', 'pending', 'descriptions')
    await expect(getPulls).toHaveBeenCalledTimes(1)
    await expect(postStatus).toHaveBeenCalledWith({
      context: 'Hey',
      description: 'descriptions',
      state: 'pending'
    })
  })

  it('open pull_request will not have head.sha ', async () => {
    github.context.payload = {
      pull_request: {
        number: 1,
        head: {
          sha: '123'
        }
      }
    }

    await commitStatus('Hey', 'pending', 'descriptions')
    await expect(getPulls).not.toHaveBeenCalled()
    await expect(postStatus).toHaveBeenCalledWith({
      context: 'Hey',
      description: 'descriptions',
      state: 'pending'
    })
  })
})
