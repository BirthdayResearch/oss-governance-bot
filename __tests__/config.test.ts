import fs from 'fs'
import nock from 'nock'
import * as github from '@actions/github'
import {getConfig} from '../src/config'

function expectConfig(path: string) {
  const client = github.getOctokit('token')
  return expect(getConfig(client, path))
}

function expectInvalid(path: string) {
  return expectConfig(
    `__tests__/fixtures/config-invalid/${path}`
  ).rejects.toThrow(/Config parse error:.+/)
}

function expectValid(path: string) {
  return expectConfig(
    `__tests__/fixtures/config-valid/${path}`
  ).resolves.toBeTruthy()
}

beforeEach(() => {
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

afterAll(() => {
  jest.clearAllMocks()
})

it('.github/governance.yml is valid', () => {
  return expectConfig('.github/governance.yml').resolves.toBeTruthy()
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
      it('issue-chat-ops-label.yml is invalid', () => {
        return expectInvalid('issue-chat-ops-label.yml')
      })
      it('issue-chat-ops-label-object.yml is invalid', () => {
        return expectInvalid('issue-chat-ops-label-object.yml')
      })
      it('issue-chat-ops-type.yml is invalid', () => {
        return expectInvalid('issue-chat-ops-type.yml')
      })
    })

    describe('label', () => {
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

  describe('pull_request', () => {
    describe('chat_ops', () => {
      it('pr-chat-ops-cmd.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-cmd.yml')
      })
      it('pr-chat-ops-comment.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-comment.yml')
      })
      it('pr-chat-ops-label.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-label.yml')
      })
      it('pr-chat-ops-label-object.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-label-object.yml')
      })
      it('pr-chat-ops-type.yml is invalid', () => {
        return expectInvalid('pr-chat-ops-type.yml')
      })
    })

    describe('label', () => {
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

      describe('status', () => {
        it('pr-label-status-context.yml is invalid', () => {
          return expectInvalid('pr-label-status-context.yml')
        })
        it('pr-label-status-empty.yml is invalid', () => {
          return expectInvalid('pr-label-status-empty.yml')
        })
        it('pr-label-status-url.yml is invalid', () => {
          return expectInvalid('pr-label-status-url.yml')
        })
      })
    })
  })

  describe('author_association', () => {
    describe('chat_ops', () => {
      it('chat-ops-author-association.yml is invalid', () => {
        return expectInvalid('chat-ops-author-association.yml')
      })
      it('chat-ops-author-association-author.yml is invalid', () => {
        return expectInvalid('chat-ops-author-association-author.yml')
      })
      it('chat-ops-author-association-contributor.yml is invalid', () => {
        return expectInvalid('chat-ops-author-association-contributor.yml')
      })
      it('chat-ops-author-association-member.yml is invalid', () => {
        return expectInvalid('chat-ops-author-association-member.yml')
      })
    })

    describe('label', () => {
      it('label-author-association.yml is invalid', () => {
        return expectInvalid('label-author-association.yml')
      })
      it('label-author-association-author.yml is invalid', () => {
        return expectInvalid('label-author-association-author.yml')
      })
      it('label-author-association-contributor.yml is invalid', () => {
        return expectInvalid('label-author-association-contributor.yml')
      })
      it('label-author-association-member.yml is invalid', () => {
        return expectInvalid('label-author-association-member.yml')
      })
    })
  })

  describe('captures', () => {
    it('captures-empty.yml is invalid', () => {
      return expectInvalid('captures-empty.yml')
    })
    it('captures-github-release.yml is invalid', () => {
      return expectInvalid('captures-github-release.yml')
    })
    it('captures-ignore-case.yml is invalid', () => {
      return expectInvalid('captures-ignore-case.yml')
    })
    it('captures-label.yml is invalid', () => {
      return expectInvalid('captures-label.yml')
    })
    it('captures-regex.yml is invalid', () => {
      return expectInvalid('captures-regex.yml')
    })
  })
})

describe('valid config', () => {
  it('version.yml is valid', () => {
    return expectValid('version.yml')
  })

  it('label-triage.yml is valid', () => {
    return expectValid('label-triage.yml')
  })

  describe('captures', () => {
    it('captures-all.yml is valid', () => {
      return expectValid('captures-all.yml')
    })
    it('captures-ignore-case.yml is valid', () => {
      return expectValid('captures-ignore-case.yml')
    })
    it('captures-minimal.yml is valid', () => {
      return expectValid('captures-minimal.yml')
    })
    it('captures-version.yml is valid', () => {
      return expectValid('captures-version.yml')
    })
  })

  describe('chat-ops', () => {
    it('chat-ops-author-association.yml is valid', () => {
      return expectValid('chat-ops-author-association.yml')
    })
    it('chat-ops-author-association-author.yml is valid', () => {
      return expectValid('chat-ops-author-association-author.yml')
    })
    it('chat-ops-author-association-contributor.yml is valid', () => {
      return expectValid('chat-ops-author-association-contributor.yml')
    })
    it('chat-ops-author-association-member.yml is valid', () => {
      return expectValid('chat-ops-author-association-member.yml')
    })

    it('chat-ops-assign.yml is valid', () => {
      return expectValid('chat-ops-assign.yml')
    })
    it('chat-ops-close.yml is valid', () => {
      return expectValid('chat-ops-close.yml')
    })
    it('chat-ops-comment.yml is valid', () => {
      return expectValid('chat-ops-comment.yml')
    })
    it('chat-ops-none.yml is valid', () => {
      return expectValid('chat-ops-none.yml')
    })
    it('chat-ops-label.yml is valid', () => {
      return expectValid('chat-ops-label.yml')
    })
    it('chat-ops-label-add.yml is valid', () => {
      return expectValid('chat-ops-label-add.yml')
    })
    it('chat-ops-label-add-array.yml is valid', () => {
      return expectValid('chat-ops-label-add-array.yml')
    })
    it('chat-ops-label-remove.yml is valid', () => {
      return expectValid('chat-ops-label-remove.yml')
    })
    it('chat-ops-label-remove-array.yml is valid', () => {
      return expectValid('chat-ops-label-remove-array.yml')
    })
    it('chat-ops-review.yml is valid', () => {
      return expectValid('chat-ops-review.yml')
    })
  })

  describe('label', () => {
    it('label-author-association.yml is valid', () => {
      return expectValid('label-author-association.yml')
    })
    it('label-author-association-author.yml is valid', () => {
      return expectValid('label-author-association-author.yml')
    })
    it('label-author-association-contributor.yml is valid', () => {
      return expectValid('label-author-association-contributor.yml')
    })
    it('label-author-association-member.yml is valid', () => {
      return expectValid('label-author-association-member.yml')
    })

    it('label-multiple-false.yml is valid', () => {
      return expectValid('label-multiple-false.yml')
    })
    it('label-multiple-true.yml is valid', () => {
      return expectValid('label-multiple-true.yml')
    })
    it('label-needs.yml is valid', () => {
      return expectValid('label-needs.yml')
    })
    it('label-prefix-list.yml is valid', () => {
      return expectValid('label-prefix-list.yml')
    })

    describe('label-status', () => {
      it('label-status.yml is valid', () => {
        return expectValid('label-status.yml')
      })
      it('label-status-context.yml is valid', () => {
        return expectValid('label-status-context.yml')
      })
      it('label-status-description-failure.yml is valid', () => {
        return expectValid('label-status-description-failure.yml')
      })
      it('label-status-description-pending.yml is valid', () => {
        return expectValid('label-status-description-pending.yml')
      })
      it('label-status-description-string.yml is valid', () => {
        return expectValid('label-status-description-string.yml')
      })
      it('label-status-description-success.yml is valid', () => {
        return expectValid('label-status-description-success.yml')
      })
      it('label-status-description-success-failure.yml is valid', () => {
        return expectValid('label-status-description-success-failure.yml')
      })
      it('label-status-description-success-pending.yml is valid', () => {
        return expectValid('label-status-description-success-pending.yml')
      })
      it('label-status-url.yml is valid', () => {
        return expectValid('label-status-url.yml')
      })
    })
  })
})
