import * as core from '@actions/core'
import * as github from '@actions/github'
import {getConfig} from '../src/config'
import {mockClient} from './client.mock'

jest.spyOn(core, 'warning').mockImplementation(jest.fn())
jest.spyOn(core, 'info').mockImplementation(jest.fn())
jest.spyOn(core, 'debug').mockImplementation(jest.fn())
jest.spyOn(core, 'setFailed').mockImplementation(jest.fn())

jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
  return {
    owner: 'owner-name',
    repo: 'repo-name'
  }
})

const client = mockClient()

function expectInvalid(path: string) {
  return expect(
    getConfig(client, `__tests__/fixtures/config-invalid/${path}`)
  ).rejects.toThrow(/Config parse error:.+/)
}

function expectValid(path: string) {
  return expect(
    getConfig(client, `__tests__/fixtures/config-valid/${path}`)
  ).resolves.toBeTruthy()
}

it('.github/governance.yml is valid', () => {
  return expect(
    getConfig(client, '.github/governance.yml')
  ).resolves.toBeTruthy()
})

describe('invalid config', () => {
  it('version.yml is invalid', () => {
    return expectInvalid('version.yml')
  })

  describe('empty', () => {
    it('empty.yml is invalid', () => {
      return expectInvalid('empty.yml')
    })

    it('empty-array.yml is invalid', () => {
      return expectInvalid('empty-array.yml')
    })
    it('empty-array-issue-chat-ops.yml is invalid', () => {
      return expectInvalid('empty-array-issue-chat-ops.yml')
    })
    it('empty-array-issue-labels.yml is invalid', () => {
      return expectInvalid('empty-array-issue-labels.yml')
    })
    it('empty-array-pr-chat-ops.yml is invalid', () => {
      return expectInvalid('empty-array-pr-chat-ops.yml')
    })
    it('empty-array-pr-labels.yml is invalid', () => {
      return expectInvalid('empty-array-pr-labels.yml')
    })
  })

  describe('issue', () => {
    describe('chat-ops', () => {
      it('issue-chat-ops-cmd.yml is invalid', () => {
        return expectInvalid('issue-chat-ops-cmd.yml')
      })
      it('issue-chat-ops-comment.yml is invalid', () => {
        return expectInvalid('issue-chat-ops-comment.yml')
      })
      it('issue-chat-ops-dispatch.yml is invalid', () => {
        return expectInvalid('issue-chat-ops-dispatch.yml')
      })
      it('issue-chat-ops-type.yml is invalid', () => {
        return expectInvalid('issue-chat-ops-type.yml')
      })
    })

    describe('label', () => {
      it('issue-label-contributor.yml is invalid', () => {
        return expectInvalid('issue-label-contributor.yml')
      })
      it('issue-label-list.yml is invalid', () => {
        return expectInvalid('issue-label-list.yml')
      })
      it('issue-label-multiple.yml is invalid', () => {
        return expectInvalid('issue-label-multiple.yml')
      })
      it('issue-label-needs.yml is invalid', () => {
        return expectInvalid('issue-label-needs.yml')
      })
      it('issue-label-needs-comment.yml is invalid', () => {
        return expectInvalid('issue-label-needs-comment.yml')
      })
      it('issue-label-prefix.yml is invalid', () => {
        return expectInvalid('issue-label-prefix.yml')
      })
    })
  })

  describe('pull-request', () => {
    describe('chat-ops', () => {
      it('pr-chat-ops-cmd.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-cmd.yml')
      })
      it('pr-chat-ops-comment.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-comment.yml')
      })
      it('pr-chat-ops-dispatch.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-dispatch.yml')
      })
      it('pr-chat-ops-type.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-type.yml')
      })
    })

    describe('label', () => {
      it('pr-label-contributor.yml is invalid', () => {
        return expectInvalid('pr-label-contributor.yml')
      })
      it('pr-label-list.yml is invalid', () => {
        return expectInvalid('pr-label-list.yml')
      })
      it('pr-label-multiple.yml is invalid', () => {
        return expectInvalid('pr-label-multiple.yml')
      })
      it('pr-label-needs.yml is invalid', () => {
        return expectInvalid('pr-label-needs.yml')
      })
      it('pr-label-needs-comment.yml is invalid', () => {
        return expectInvalid('pr-label-needs-comment.yml')
      })
      it('pr-label-prefix.yml is invalid', () => {
        return expectInvalid('pr-label-prefix.yml')
      })
    })
  })
})

describe('valid config', () => {
  it('version.yml is invalid', () => {
    return expectValid('version.yml')
  })

  describe('chat-ops', () => {
    it('chat-ops-assign.yml is invalid', () => {
      return expectValid('chat-ops-assign.yml')
    })
    it('chat-ops-close.yml is invalid', () => {
      return expectValid('chat-ops-close.yml')
    })
    it('chat-ops-comment.yml is invalid', () => {
      return expectValid('chat-ops-comment.yml')
    })
    it('chat-ops-dispatch.yml is invalid', () => {
      return expectValid('chat-ops-dispatch.yml')
    })
    it('chat-ops-none.yml is invalid', () => {
      return expectValid('chat-ops-none.yml')
    })
    it('chat-ops-review.yml is invalid', () => {
      return expectValid('chat-ops-review.yml')
    })
  })

  describe('label', () => {
    it('label-contributor-false.yml is invalid', () => {
      return expectValid('label-contributor-false.yml')
    })
    it('label-contributor-true.yml is invalid', () => {
      return expectValid('label-contributor-true.yml')
    })
    it('label-multiple-false.yml is invalid', () => {
      return expectValid('label-multiple-false.yml')
    })
    it('label-multiple-true.yml is invalid', () => {
      return expectValid('label-multiple-true.yml')
    })
    it('label-needs.yml is invalid', () => {
      return expectValid('label-needs.yml')
    })
    it('label-prefix-list.yml is invalid', () => {
      return expectValid('label-prefix-list.yml')
    })
  })
})
