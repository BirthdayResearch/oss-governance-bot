import * as core from '@actions/core'
import * as github from '@actions/github'
import nock from 'nock'
import fs from 'fs'

const info = jest.fn()
const error = jest.fn()

beforeEach(() => {
  jest.setTimeout(10000)
  github.context.eventName = 'issue_comment'
  github.context.action = 'created'
  github.context.payload = {
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
      let path = contentsRegex.exec(this.req.path)?.[1] || ''
      path = decodeURIComponent(path)
      path = path.split('?')[0]
      return {
        content: fs.readFileSync(path, 'utf8'),
        encoding: 'utf-8'
      }
    })
})

describe('getGovernance', () => {
  it('should error not get from context', async function () {
    github.context.payload = {}

    const {getGovernance} = require('../src/main')

    await expect(getGovernance()).rejects.toThrow(
      'Could not get pull_request or issue from context'
    )
  })

  it('should be issue', async function () {
    github.context.payload = {
      issue: {
        number: 1
      }
    }

    const {getGovernance} = require('../src/main')
    const governance = await getGovernance()

    expect(governance?.labels?.length).toBe(5)
  })

  it('should be pull request', async function () {
    github.context.payload = {
      pull_request: {
        number: 1
      }
    }

    const {getGovernance} = require('../src/main')
    const governance = await getGovernance()
    expect(governance?.labels?.length).toBe(2)
  })
})
