import ignore from '../src/ignore'
import * as github from '@actions/github'

function set(eventName: string, action: string, userType: string) {
  github.context.eventName = eventName
  github.context.payload = {
    action: action,
    sender: {
      type: userType
    }
  }
}

async function expectIgnore(expected: boolean): Promise<void> {
  await expect.assertions(1)
  await expect(ignore()).resolves.toBe(expected)
}

beforeEach(() => {
  set('issue_comment', 'created', 'User')
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
})
