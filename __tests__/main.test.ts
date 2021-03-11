import * as core from '@actions/core'
import * as github from '@actions/github'
import nock from 'nock'
import fs from 'fs'

const info = jest.fn()
const error = jest.fn()
const intercepted = jest.fn()

beforeEach(() => {
  github.context.eventName = 'issue_comment'
  github.context.payload = {
    action: 'created',
    issue: {
      number: 1
    },
    sender: {
      type: 'User'
    }
  }

  jest.spyOn(core, 'info').mockImplementation(info)
  jest.spyOn(core, 'error').mockImplementation(error)
  jest.spyOn(core, 'warning').mockImplementation(jest.fn())
  jest.spyOn(core, 'debug').mockImplementation(jest.fn())
  jest.spyOn(core, 'setFailed').mockImplementation(jest.fn())

  jest.spyOn(core, 'getInput').mockImplementation(name => {
    switch (name) {
      case 'github-token':
        return 'token'
      case 'config-path':
        return '.github/governance.yml'
      default:
        return ''
    }
  })

  jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
    return {
      owner: 'owner',
      repo: 'repo'
    }
  })

  const contentsRegex = /\/repos\/owner\/repo\/contents\/([^?]+).*/
  nock('https://api.github.com')
    .get(contentsRegex)
    .reply(200, function () {
      const path = contentsRegex.exec(this.req.path)?.[1] || ''
      return {
        content: fs.readFileSync(decodeURIComponent(path), 'utf8'),
        encoding: 'utf-8'
      }
    })
    .persist()

  nock('https://api.github.com')
    .get(/.+/)
    .reply(200, () => {
      intercepted()
      return {}
    })
    .persist()
  nock('https://api.github.com')
    .post(/.+/)
    .reply(200, () => {
      intercepted()
      return {}
    })
    .persist()
  nock('https://api.github.com')
    .delete(/.+/)
    .reply(200, () => {
      intercepted()
      return {}
    })
    .persist()
  nock('https://api.github.com')
    .patch(/.+/)
    .reply(200, () => {
      intercepted()
      return {}
    })
    .persist()
})

describe('getGovernance', () => {
  it('should error not get from context', async function () {
    jest.setTimeout(10000)
    github.context.payload = {}

    const {getGovernance} = require('../src/main')

    await expect(getGovernance()).rejects.toThrow(
      'Could not get pull_request or issue from context'
    )
  })

  it('should be issue', async function () {
    jest.setTimeout(10000)
    github.context.payload = {
      issue: {
        number: 1,
        state: 'open'
      }
    }

    const {getGovernance} = require('../src/main')
    const governance = await getGovernance()

    expect(governance?.labels?.length).toBe(2)
  })

  it('should be pull request', async function () {
    jest.setTimeout(10000)
    github.context.payload = {
      pull_request: {
        number: 1
      }
    }

    const {getGovernance} = require('../src/main')
    const governance = await getGovernance()
    expect(governance?.labels?.length).toBe(2)
  })

  describe('comment', () => {
    it('should be issue', async function () {
      jest.setTimeout(10000)
      github.context.payload = {
        comment: {
          id: 1
        },
        issue: {
          number: 1,
          state: 'open'
        }
      }

      const {getGovernance} = require('../src/main')
      const governance = await getGovernance()

      expect(governance?.labels?.length).toBe(2)
    })

    it('should be pull request', async function () {
      jest.setTimeout(10000)
      github.context.payload = {
        comment: {
          id: 1
        },
        issue: {
          number: 1,
          pull_request: {
            diff_url:
              'https://github.com/DeFiCh/oss-governance-bot/pull/9.diff',
            html_url: 'https://github.com/DeFiCh/oss-governance-bot/pull/9',
            patch_url:
              'https://github.com/DeFiCh/oss-governance-bot/pull/9.patch',
            url:
              'https://api.github.com/repos/DeFiCh/oss-governance-bot/pulls/9'
          }
        }
      }

      const {getGovernance} = require('../src/main')
      const governance = await getGovernance()
      expect(governance?.labels?.length).toBe(2)
    })
  })
})

describe('runGovernance', () => {
  it('should be issue', async function () {
    jest.setTimeout(10000)
    github.context.payload = {
      issue: {
        number: 1
      }
    }

    const {runGovernance} = require('../src/main')
    await runGovernance()
    await expect(info).toHaveBeenCalledWith('main: completed operations')
    await expect(intercepted).toHaveBeenCalled()
  })

  it('should be pull request', async function () {
    jest.setTimeout(10000)
    github.context.payload = {
      pull_request: {
        number: 1,
        head: {
          sha: '123'
        }
      }
    }

    const {runGovernance} = require('../src/main')
    await runGovernance()
    await expect(info).toHaveBeenCalledWith('main: completed operations')
    await expect(intercepted).toHaveBeenCalled()
  })

  it('should return no governance', async function () {
    jest.setTimeout(10000)
    github.context.payload = {
      pull_request: {
        number: 1,
        head: {
          sha: '123'
        }
      }
    }
    jest.spyOn(core, 'getInput').mockImplementation(name => {
      switch (name) {
        case 'github-token':
          return 'token'
        case 'config-path':
          return '__tests__/fixtures/config-valid/version.yml'
        default:
          return ''
      }
    })

    const {runGovernance} = require('../src/main')
    await runGovernance()
    await expect(info).toHaveBeenCalledTimes(1)
    await expect(intercepted).not.toHaveBeenCalled()
  })
})
