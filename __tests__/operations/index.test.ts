import * as core from "@actions/core";
import * as github from "@actions/github";
import nock from "nock";
import operations from "../../src/operations";
import {Command, Commands} from "../../src/command";

const intercepted = jest.fn()

beforeEach(() => {
  jest.spyOn(core, 'getInput').mockImplementation(name => {
    return 'token'
  })

  jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
    return {
      owner: 'owner',
      repo: 'repo'
    }
  })

  github.context.eventName = 'issues'
  github.context.payload = {
    action: 'opened',
    issue: {
      number: 1,
      labels: [],
      body: 'Hello friends\n- Operating System: linux \r\n- Version: v1.5.0',
      author_association: 'CONTRIBUTOR'
    }
  }

  nock('https://api.github.com').get(/.+/).reply(200, () => {
    intercepted()
    return {}
  }).persist()
  nock('https://api.github.com').post(/.+/).reply(200, () => {
    intercepted()
    return {}
  }).persist()
  nock('https://api.github.com').delete(/.+/).reply(200, () => {
    intercepted()
    return {}
  }).persist()
  nock('https://api.github.com').patch(/.+/).reply(200, () => {
    intercepted()
    return {}
  }).persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

function getCommands(list: string[] = []): Commands {
  return new Commands(list.map(t => new Command((t))))
}

describe('all', () => {
  it('should not have error', async () => {
    await operations({
      labels: [
        {
          prefix: 'prefix',
          list: ['a', 'b'],
          needs: true,
          author_association: {
            owner: true
          }
        },
        {
          prefix: 'another',
          list: ['a', 'b'],
          needs: true,
        }
      ],
      captures: [
        {
          regex: "- Operating System: *(linux) *",
          label: 'os/linux'
        },
        {
          regex: "- Version: *(.+) *",
          label: 'v/$CAPTURED',
          github_release: true
        }
      ],
      chat_ops: [
        {
          cmd: '/close',
          type: 'close'
        },
        {
          cmd: '/no run',
          type: 'none',
          author_association: {
            owner: true
          }
        }
      ]
    }, getCommands(['/close', '/prefix a', '/another a']))
    await expect(intercepted).toHaveBeenCalledTimes(6)
  });
})

describe('labels', () => {
  it('should not have error', async () => {
    await operations({
      labels: [
        {
          prefix: 'prefix',
          list: ['a', 'b'],
          needs: true,
        }
      ]
    }, getCommands())
    await expect(intercepted).toHaveBeenCalledTimes(1)
  })
})

describe('captures', () => {
  it('should not have error', async () => {
    await operations({
      captures: [
        {
          regex: "- Operating System: *(linux) *",
          label: 'os/linux'
        },
        {
          regex: "- Version: *(.+) *",
          label: 'v/$CAPTURED',
          github_release: true
        }
      ]
    }, getCommands())
    await expect(intercepted).toHaveBeenCalledTimes(3)
  })
})

describe('chat-ops', () => {
  it('should not have error', async () => {
    await operations({
      chat_ops: [
        {
          cmd: '/close',
          type: 'close'
        },
        {
          cmd: '/cc',
          type: 'none'
        },
        {
          cmd: '/request',
          type: 'review'
        },
        {
          cmd: '/assign',
          type: 'assign'
        },
        {
          cmd: '/comment me',
          type: 'comment',
          comment: 'abc'
        },
        {
          cmd: '/label me',
          type: 'label',
          label: {
            add: 'me'
          }
        }
      ]
    }, getCommands(['/close', '/cc', '/request']))
    await expect(intercepted).toHaveBeenCalledTimes(1)
  });
})
