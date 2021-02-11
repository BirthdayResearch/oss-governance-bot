import * as core from "@actions/core";
import * as github from "@actions/github";
import nock from "nock";
import operations from "../../src/operations";
import {Commands} from "../../src/command";

const intercepted = jest.fn()

beforeAll(() => {
  jest.spyOn(core, 'getInput').mockImplementation(name => {
    return 'token'
  })

  jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
    return {
      owner: 'owner',
      repo: 'repo'
    }
  })

  nock('https://api.github.com').get(/.+/).reply(intercepted)
  nock('https://api.github.com').post(/.+/).reply(intercepted)
  nock('https://api.github.com').delete(/.+/).reply(intercepted)
})

afterAll(() => {
  jest.clearAllMocks()
})

describe('labels', () => {
  it('should not have error', async () => {
    github.context.payload = {
      issue: {
        number: 1,
        labels: []
      }
    }

    await operations({
      labels: [
        {
          prefix: 'prefix',
          list: ['a', 'b'],
        }
      ]
    }, new Commands([]))
  })
})

describe('chat-ops', () => {
  it('should not have error', async () => {
    github.context.payload = {
      issue: {
        number: 1,
        labels: []
      }
    }

    await operations({
      chat_ops: [
        {
          cmd: '/close',
          type: 'close'
        }
      ]
    }, new Commands([]))
  });
})
