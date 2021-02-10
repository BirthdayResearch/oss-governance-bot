import * as core from '@actions/core'
import * as github from '@actions/github'
import waitForExpect from 'wait-for-expect'
import nock from 'nock'
import fs from 'fs'

beforeEach(() => {
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

  jest.spyOn(core, 'warning').mockImplementation(jest.fn())
  jest.spyOn(core, 'info').mockImplementation(jest.fn())
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
})

describe('main', () => {
  it('should be completed', function () {
    const info = jest.fn()
    jest.spyOn(core, 'info').mockImplementation(info)

    require('../src/main')

    return waitForExpect(() => {
      expect(info).toBeCalledWith('oss-governance: completed')
    })
  })
})
