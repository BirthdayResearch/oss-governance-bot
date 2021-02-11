import * as github from "@actions/github";
import {AuthorAssociation} from "../../src/config";
import {isAuthorAssociationAllowed} from "../../src/operations/author-association";

function expectAssociation(association: AuthorAssociation | undefined, type: string, target: string = 'comment') {
  github.context.payload[target] = {
    id: 1,
    author_association: type
  }

  return expect(isAuthorAssociationAllowed(association))
}

describe('all association', function () {
  it('should empty true', function () {
    expectAssociation(undefined, 'OWNER').toBeTruthy()
  });

  it('should fail invalid match', function () {
    expectAssociation({collaborator: false}, 'OWNER').toBeFalsy()
  });

  describe('COLLABORATOR', () => {
    it('should collaborator false', function () {
      expectAssociation({collaborator: false}, 'COLLABORATOR').toBeFalsy()
    });

    it('should collaborator true', function () {
      expectAssociation({collaborator: true}, 'COLLABORATOR').toBeTruthy()
    });
  })

  describe('CONTRIBUTOR', () => {
    it('should contributor false', function () {
      expectAssociation({contributor: false}, 'CONTRIBUTOR').toBeFalsy()
    });

    it('should contributor true', function () {
      expectAssociation({contributor: true}, 'CONTRIBUTOR').toBeTruthy()
    });
  })

  describe('FIRST_TIMER', () => {
    it('should first_timer false', function () {
      expectAssociation({first_timer: false}, 'FIRST_TIMER').toBeFalsy()
    });

    it('should first_timer true', function () {
      expectAssociation({first_timer: true}, 'FIRST_TIMER').toBeTruthy()
    });
  })

  describe('FIRST_TIME_CONTRIBUTOR', () => {
    it('should first_time_contributor false', function () {
      expectAssociation({first_time_contributor: false}, 'FIRST_TIME_CONTRIBUTOR').toBeFalsy()
    });

    it('should first_time_contributor true', function () {
      expectAssociation({first_time_contributor: true}, 'FIRST_TIME_CONTRIBUTOR').toBeTruthy()
    });
  })

  describe('MANNEQUIN', () => {
    it('should mannequin false', function () {
      expectAssociation({mannequin: false}, 'MANNEQUIN').toBeFalsy()
    });

    it('should mannequin true', function () {
      expectAssociation({mannequin: true}, 'MANNEQUIN').toBeTruthy()
    });
  })

  describe('MEMBER', () => {
    it('should member false', function () {
      expectAssociation({member: false}, 'MEMBER').toBeFalsy()
    });

    it('should member true', function () {
      expectAssociation({member: true}, 'MEMBER').toBeTruthy()
    });
  })

  describe('NONE', () => {
    it('should none false', function () {
      expectAssociation({none: false}, 'NONE').toBeFalsy()
    });

    it('should none true', function () {
      expectAssociation({none: true}, 'NONE').toBeTruthy()
    });
  })

  describe('OWNER', () => {
    it('should owner false', function () {
      expectAssociation({owner: false}, 'OWNER').toBeFalsy()
    });

    it('should owner true', function () {
      expectAssociation({owner: true}, 'OWNER').toBeTruthy()
    });
  })
});

describe('pull_request', function () {
  it('should owner true', function () {
    expectAssociation({owner: true}, 'OWNER', 'pull_request')
      .toBeTruthy()
  });
});

describe('issue', function () {
  it('should owner true', function () {
    expectAssociation({owner: true}, 'OWNER', 'issue')
      .toBeTruthy()
  });
});

describe('comment', function () {
  it('should owner true', function () {
    expectAssociation({owner: true}, 'OWNER', 'comment')
      .toBeTruthy()
  });
});
