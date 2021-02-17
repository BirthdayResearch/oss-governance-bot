import * as github from '@actions/github'
import {AuthorAssociation} from '../src/config'
import {isAuthorAssociationAllowed} from '../src/author-association'

function expectAssociation(
  association: AuthorAssociation | undefined,
  type: string,
  target: string = 'comment'
) {
  github.context.payload = {}
  github.context.payload[target] = {
    id: 1,
    author_association: type
  }

  return expect(isAuthorAssociationAllowed(association))
}

describe('all association', function () {
  it('should empty true', function () {
    expectAssociation(undefined, 'OWNER').toBe(true)
  })

  it('invalid type should be false', function () {
    expectAssociation({}, 'INVALID').toBe(false)
  })

  it('should fail invalid match', function () {
    expectAssociation({collaborator: false}, 'OWNER').toBe(false)
  })

  describe('COLLABORATOR', () => {
    it('should collaborator false', function () {
      expectAssociation({collaborator: false}, 'COLLABORATOR').toBe(false)
    })

    it('should collaborator true', function () {
      expectAssociation({collaborator: true}, 'COLLABORATOR').toBe(true)
    })
  })

  describe('CONTRIBUTOR', () => {
    it('should contributor false', function () {
      expectAssociation({contributor: false}, 'CONTRIBUTOR').toBe(false)
    })

    it('should contributor true', function () {
      expectAssociation({contributor: true}, 'CONTRIBUTOR').toBe(true)
    })
  })

  describe('FIRST_TIMER', () => {
    it('should first_timer false', function () {
      expectAssociation({first_timer: false}, 'FIRST_TIMER').toBe(false)
    })

    it('should first_timer true', function () {
      expectAssociation({first_timer: true}, 'FIRST_TIMER').toBe(true)
    })
  })

  describe('FIRST_TIME_CONTRIBUTOR', () => {
    it('should first_time_contributor false', function () {
      expectAssociation(
        {first_time_contributor: false},
        'FIRST_TIME_CONTRIBUTOR'
      ).toBe(false)
    })

    it('should first_time_contributor true', function () {
      expectAssociation(
        {first_time_contributor: true},
        'FIRST_TIME_CONTRIBUTOR'
      ).toBe(true)
    })
  })

  describe('MANNEQUIN', () => {
    it('should mannequin false', function () {
      expectAssociation({mannequin: false}, 'MANNEQUIN').toBe(false)
    })

    it('should mannequin true', function () {
      expectAssociation({mannequin: true}, 'MANNEQUIN').toBe(true)
    })
  })

  describe('MEMBER', () => {
    it('should member false', function () {
      expectAssociation({member: false}, 'MEMBER').toBe(false)
    })

    it('should member true', function () {
      expectAssociation({member: true}, 'MEMBER').toBe(true)
    })
  })

  describe('NONE', () => {
    it('should none false', function () {
      expectAssociation({none: false}, 'NONE').toBe(false)
    })

    it('should none true', function () {
      expectAssociation({none: true}, 'NONE').toBe(true)
    })
  })

  describe('OWNER', () => {
    it('should owner false', function () {
      expectAssociation({owner: false}, 'OWNER').toBe(false)
    })

    it('should owner true', function () {
      expectAssociation({owner: true}, 'OWNER').toBe(true)
    })
  })
})

describe('pull_request', function () {
  it('should owner true', function () {
    expectAssociation({owner: true}, 'OWNER', 'pull_request').toBe(true)
  })
})

describe('issue', function () {
  it('should owner true', function () {
    expectAssociation({owner: true}, 'OWNER', 'issue').toBe(true)
  })
})

describe('comment', function () {
  it('should owner true', function () {
    expectAssociation({owner: true}, 'OWNER', 'comment').toBe(true)
  })

  it('should take comment priority owner', function () {
    github.context.payload = {
      comment: {
        id: 1,
        author_association: 'OWNER'
      },
      issue: {
        number: 1,
        author_association: 'MEMBER'
      }
    }

    expect(isAuthorAssociationAllowed({owner: true})).toBe(true)
  })

  it('should take comment priority member', function () {
    github.context.payload = {
      comment: {
        id: 1,
        author_association: 'MEMBER'
      },
      issue: {
        number: 1,
        author_association: 'MEMBER'
      }
    }

    expect(isAuthorAssociationAllowed({owner: true})).toBe(false)
  })
})

describe('comment/issue author', function () {
  it('comment author is issue author', function () {
    github.context.payload = {
      comment: {
        id: 1,
        author_association: 'OWNER',
        user: {
          login: 'DeFiCh',
          type: 'ORGANIZATION'
        }
      },
      issue: {
        number: 1,
        author_association: 'OWNER',
        user: {
          login: 'DeFiCh'
        }
      }
    }

    expect(isAuthorAssociationAllowed({author: true})).toBe(true)
  })

  it('comment author is not issue author', function () {
    github.context.payload = {
      comment: {
        id: 1,
        author_association: 'OWNER',
        user: {
          login: 'DeFiCh',
          type: 'ORGANIZATION'
        }
      },
      issue: {
        number: 1,
        author_association: 'MEMBER',
        user: {
          login: 'DeFiChMember'
        }
      }
    }

    expect(isAuthorAssociationAllowed({author: true})).toBe(false)
  })

  it('comment author is not issue author but is member', function () {
    github.context.payload = {
      comment: {
        id: 1,
        author_association: 'MEMBER',
        user: {
          login: 'DeFiChMember',
          type: 'USER'
        }
      },
      issue: {
        number: 1,
        author_association: 'OWNER',
        user: {
          login: 'DeFiCh',
          type: 'ORGANIZATION'
        }
      }
    }

    expect(isAuthorAssociationAllowed({author: true, member: true})).toBe(true)
  })
})
