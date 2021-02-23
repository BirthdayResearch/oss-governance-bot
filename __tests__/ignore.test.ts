import ignore, {isCreatedOpened} from '../src/ignore'
import * as github from '@actions/github'
import nock from 'nock'
import * as core from '@actions/core'

function set(
  eventName: string,
  action: string,
  userType: string,
  options: any = {}
) {
  github.context.eventName = eventName
  github.context.payload = {
    action: action,
    sender: {
      type: userType,
      login: 'defichain-bot',
      id: 100000
    },
    ...options
  }
}

async function expectIgnore(expected: boolean): Promise<void> {
  await expect.assertions(1)
  await expect(ignore()).resolves.toBe(expected)
}

beforeEach(() => {
  set('issue_comment', 'created', 'User')

  jest.spyOn(core, 'getInput').mockImplementation(name => {
    return 'eg-bot-token'
  })

  nock('https://api.github.com')
    .get('/user')
    .reply(200, function () {
      return {
        login: 'real-human',
        id: 9999
      }
    })
})

afterAll(() => {
  jest.clearAllMocks()
})

it('default should not ignore', async () => {
  await expectIgnore(false)
})

describe('sender', () => {
  it('should not ignore User', async () => {
    set('issue_comment', 'created', 'User')
    await expectIgnore(false)
  })

  it('should ignore Bot', async () => {
    set('issue_comment', 'created', 'Bot')
    await expectIgnore(true)
  })

  it('should ignore bot-token', async () => {
    github.context.eventName = 'issue_comment'
    github.context.payload = {
      action: 'created',
      sender: {
        type: 'User',
        login: 'real-human',
        id: 9999
      }
    }
    await expectIgnore(true)
  })
})

describe('issue_comment', () => {
  it('should not ignore created', async () => {
    set('issue_comment', 'created', 'User')
    await expectIgnore(false)
  })

  it('should ignore created if Bot', async () => {
    set('issue_comment', 'created', 'Bot')
    await expectIgnore(true)
  })

  it('should ignore edited', async () => {
    set('issue_comment', 'edited', 'User')
    await expectIgnore(true)
  })

  it('should ignore deleted', async () => {
    set('issue_comment', 'deleted', 'User')
    await expectIgnore(true)
  })

  it('should ignore created but closed', async () => {
    set('issue_comment', 'created', 'User', {
      pull_request: {
        number: 1,
        state: 'closed'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore created but closed', async () => {
    set('issue_comment', 'created', 'User', {
      issue: {
        number: 1,
        state: 'closed'
      }
    })
    await expectIgnore(true)
  })
})

describe('pull_request', () => {
  it('should not ignore opened', async () => {
    set('pull_request', 'opened', 'User')
    await expectIgnore(false)
  })

  it('should not ignore unlabeled', async () => {
    set('pull_request', 'labeled', 'User')
    await expectIgnore(false)
  })

  it('should not ignore unlabeled', async () => {
    set('pull_request', 'unlabeled', 'User')
    await expectIgnore(false)
  })

  it('should not ignore synchronize', async () => {
    set('pull_request', 'synchronize', 'User')
    await expectIgnore(false)
  })

  it('should ignore opened if Bot', async () => {
    set('pull_request', 'opened', 'Bot')
    await expectIgnore(true)
  })

  it('should ignore locked', async () => {
    set('pull_request', 'locked', 'User')
    await expectIgnore(true)
  })

  it('should ignore edited', async () => {
    set('pull_request', 'edited', 'User')
    await expectIgnore(true)
  })

  it('should ignore if updated only 1s has passed', async () => {
    set('pull_request', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:03:59Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 2s has passed', async () => {
    set('pull_request', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:00Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 3s has passed', async () => {
    set('pull_request', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:01Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 4s has passed', async () => {
    set('pull_request', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:02Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 5s has passed', async () => {
    set('pull_request', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:03Z'
      }
    })
    await expectIgnore(true)
  })

  it('should not ignore if updated 10s later', async () => {
    set('pull_request', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:08Z'
      }
    })
    await expectIgnore(false)
  })

  it('should not ignore if updated more than 1min later', async () => {
    set('pull_request', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:51Z',
        updated_at: '2021-02-01T09:04:59Z'
      }
    })
    await expectIgnore(false)
  })
})

describe('pull_request_target', () => {
  it('should not ignore opened', async () => {
    set('pull_request_target', 'opened', 'User')
    await expectIgnore(false)
  })

  it('should not ignore unlabeled', async () => {
    set('pull_request_target', 'labeled', 'User')
    await expectIgnore(false)
  })

  it('should not ignore unlabeled', async () => {
    set('pull_request_target', 'unlabeled', 'User')
    await expectIgnore(false)
  })

  it('should not ignore synchronize', async () => {
    set('pull_request_target', 'synchronize', 'User')
    await expectIgnore(false)
  })

  it('should ignore opened if Bot', async () => {
    set('pull_request_target', 'opened', 'Bot')
    await expectIgnore(true)
  })

  it('should ignore locked', async () => {
    set('pull_request_target', 'locked', 'User')
    await expectIgnore(true)
  })

  it('should ignore edited', async () => {
    set('pull_request_target', 'edited', 'User')
    await expectIgnore(true)
  })

  it('should ignore if updated only 1s has passed', async () => {
    set('pull_request_target', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:03:59Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 2s has passed', async () => {
    set('pull_request_target', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:00Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 3s has passed', async () => {
    set('pull_request_target', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:01Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 4s has passed', async () => {
    set('pull_request_target', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:02Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 5s has passed', async () => {
    set('pull_request_target', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:03Z'
      }
    })
    await expectIgnore(true)
  })

  it('should not ignore if updated 10s later', async () => {
    set('pull_request_target', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:08Z'
      }
    })
    await expectIgnore(false)
  })

  it('should not ignore if updated more than 1min later', async () => {
    set('pull_request_target', 'labeled', 'User', {
      pull_request: {
        number: 1,
        created_at: '2021-02-01T07:03:51Z',
        updated_at: '2021-02-01T09:04:59Z'
      }
    })
    await expectIgnore(false)
  })
})

describe('issues', () => {
  it('should not ignore opened', async () => {
    set('issues', 'opened', 'User')
    await expectIgnore(false)
  })

  it('should not ignore labeled', async () => {
    set('pull_request', 'labeled', 'User')
    await expectIgnore(false)
  })

  it('should not ignore labeled', async () => {
    set('pull_request_target', 'labeled', 'User')
    await expectIgnore(false)
  })

  it('should not ignore unlabeled', async () => {
    set('issues', 'unlabeled', 'User')
    await expectIgnore(false)
  })

  it('should ignore opened if Bot', async () => {
    set('issues', 'opened', 'Bot')
    await expectIgnore(true)
  })

  it('should ignore assigned', async () => {
    set('issues', 'assigned', 'User')
    await expectIgnore(true)
  })

  it('should ignore edited', async () => {
    set('issues', 'edited', 'User')
    await expectIgnore(true)
  })

  it('should ignore if updated only 1s has passed', async () => {
    set('issues', 'labeled', 'User', {
      issue: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:03:59Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 2s has passed', async () => {
    set('issues', 'labeled', 'User', {
      issue: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:00Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 3s has passed', async () => {
    set('issues', 'labeled', 'User', {
      issue: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:01Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 4s has passed', async () => {
    set('issues', 'labeled', 'User', {
      issue: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:02Z'
      }
    })
    await expectIgnore(true)
  })

  it('should ignore if updated only 5s has passed', async () => {
    set('issues', 'labeled', 'User', {
      issue: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:03Z'
      }
    })
    await expectIgnore(true)
  })

  it('should not ignore if updated 10s later', async () => {
    set('issues', 'labeled', 'User', {
      issue: {
        number: 1,
        created_at: '2021-02-01T07:03:58Z',
        updated_at: '2021-02-01T07:04:08Z'
      }
    })
    await expectIgnore(false)
  })

  it('should not ignore if updated more than 1min later', async () => {
    set('issues', 'labeled', 'User', {
      issue: {
        number: 1,
        created_at: '2021-02-01T07:03:51Z',
        updated_at: '2021-02-01T09:04:59Z'
      }
    })
    await expectIgnore(false)
  })
})

describe('isCreatedOpened', () => {
  async function expectCreatedOpened(expected: boolean): Promise<void> {
    await expect.assertions(1)
    await expect(isCreatedOpened()).toBe(expected)
  }

  it('issue_comment created should be true', async () => {
    set('issue_comment', 'created', 'User')
    await expectCreatedOpened(true)
  })

  it('pull_request opened should be true', async () => {
    set('pull_request', 'opened', 'User')
    await expectCreatedOpened(true)
  })

  it('pull_request_target opened should be true', async () => {
    set('pull_request_target', 'opened', 'User')
    await expectCreatedOpened(true)
  })

  it('issues opened should be true', async () => {
    set('issues', 'opened', 'User')
    await expectCreatedOpened(true)
  })

  it('issue_comment edited should be true', async () => {
    set('issue_comment', 'edited', 'User')
    await expectCreatedOpened(false)
  })

  it('pull_request labeled should be true', async () => {
    set('pull_request', 'labeled', 'User')
    await expectCreatedOpened(false)
  })

  it('pull_request_target labeled should be true', async () => {
    set('pull_request_target', 'labeled', 'User')
    await expectCreatedOpened(false)
  })

  it('issues labeled should be true', async () => {
    set('issues', 'labeled', 'User')
    await expectCreatedOpened(false)
  })
})
