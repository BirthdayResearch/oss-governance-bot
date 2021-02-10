import ignore from '../src/ignore'
import * as github from '@actions/github'
import {Config} from '../src/config'

beforeEach(() => {
  github.context.eventName = 'issue_comment'
  github.context.action = 'created'
  github.context.payload = {
    sender: {
      type: 'User'
    }
  }
})

afterAll(() => {
  jest.clearAllMocks()
})

function expectIgnore(expected: boolean) {
  const config: Config = {
    version: 'v1'
  }
  expect.assertions(1)
  return expect(ignore(config)).resolves.toBe(expected)
}

it('default should not ignore', function () {
  expectIgnore(false)
})

describe('sender', () => {
  it('should not ignore User', function () {
    github.context.payload = {
      sender: {
        type: 'User'
      }
    }
    expectIgnore(false)
  })

  it('should ignore Bot', function () {
    github.context.payload = {
      sender: {
        type: 'Bot'
      }
    }
    expectIgnore(true)
  })
})

describe('issue_comment', () => {
  beforeEach(() => {
    github.context.eventName = 'issue_comment'
  })

  it('should not ignore created', function () {
    github.context.action = 'created'
    expectIgnore(false)
  })

  it('should ignore edited', function () {
    github.context.action = 'edited'
    expectIgnore(true)
  })
})

describe('pull_request', () => {
  beforeEach(() => {
    github.context.eventName = 'pull_request'
  })

  it('should not ignore opened', function () {
    github.context.action = 'opened'
    expectIgnore(false)
  })

  it('should not ignore opened', function () {
    github.context.action = 'opened'
    expectIgnore(false)
  })

  it('should not ignore unlabeled', function () {
    github.context.action = 'unlabeled'
    expectIgnore(false)
  })

  it('should ignore locked', function () {
    github.context.action = 'locked'
    expectIgnore(true)
  })

  it('should ignore edited', function () {
    github.context.action = 'edited'
    expectIgnore(true)
  })
})

describe('issues', () => {
  beforeEach(() => {
    github.context.eventName = 'issues'
  })

  it('should not ignore opened', function () {
    github.context.action = 'opened'
    expectIgnore(false)
  })

  it('should not ignore opened', function () {
    github.context.action = 'opened'
    expectIgnore(false)
  })

  it('should not ignore unlabeled', function () {
    github.context.action = 'unlabeled'
    expectIgnore(false)
  })

  it('should ignore assigned', function () {
    github.context.action = 'assigned'
    expectIgnore(true)
  })

  it('should ignore edited', function () {
    github.context.action = 'edited'
    expectIgnore(true)
  })
})
