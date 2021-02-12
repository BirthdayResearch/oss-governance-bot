import label from '../../src/operations/label'
import {Command, Commands} from "../../src/command";
import * as github from "@actions/github";
import * as core from "@actions/core";
import nock from "nock";

const postComments = jest.fn()
const postLabels = jest.fn()
const deleteLabels = jest.fn()

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

  nock('https://api.github.com')
    .post('/repos/owner/repo/issues/1/comments')
    .reply(200, function (_, body) {
      postComments(body)
      return {}
    }).persist()

  nock('https://api.github.com')
    .post('/repos/owner/repo/issues/1/labels')
    .reply(200, function (_, body) {
      postLabels(body)
      return {}
    }).persist()

  nock('https://api.github.com')
    .delete(/\/repos\/owner\/repo\/issues\/1\/labels\/.+/)
    .reply(200, function (_, body) {
      const paths = this.req.path.split('/')
      deleteLabels(decodeURIComponent(paths[paths.length - 1]))
      return {}
    }).persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

function getCommands(list: string[] = []): Commands {
  return new Commands(list.map(t => new Command((t))))
}

describe('needs', () => {
  it('should have needs/triage when needs is true', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: []
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
      needs: true
    }, getCommands())

    return expect(postLabels).toHaveBeenCalledWith({labels: ['needs/triage']})
  });

  it('should have needs/triage when needs.comment is present', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: []
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
      needs: {
        comment: 'Hello you!'
      }
    }, getCommands())

    return expect(postLabels).toHaveBeenCalledWith({labels: ['needs/triage']})
  });

  it('should have needs/triage when /needs triage is commented', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: []
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
    }, getCommands(['/needs triage']))

    return expect(postLabels).toHaveBeenCalledWith({labels: ['needs/triage']})
  });

  it('should not have needs/triage when /needs triage is commented because its already present', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: [{name: 'triage/accepted'}]
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
    }, getCommands(['/need triage']))

    await expect(postLabels).not.toHaveBeenCalled()
    await expect(postComments).not.toHaveBeenCalled()
    await expect(deleteLabels).not.toHaveBeenCalled()
  });

  it('should have needs/triage removed when labeled', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: [{name: 'needs/triage'}, {name: 'triage/accepted'}]
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted', 'rejected'],
    }, getCommands())

    await expect(postLabels).not.toHaveBeenCalled()
    await expect(postComments).not.toHaveBeenCalled()
    await expect(deleteLabels).toHaveBeenCalledWith("needs/triage")
  });

  it('should have needs/triage removed when /triage accepted', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: [{name: 'needs/triage'}]
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted', 'rejected'],
    }, getCommands(['/triage accepted']))

    await expect(postLabels).toHaveBeenCalledWith({labels: ['triage/accepted']})
    await expect(deleteLabels).toHaveBeenCalledWith("needs/triage")
  });

  it('should have needs/triage removed when /triage rejected', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: [{name: 'needs/triage'}]
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted', 'rejected'],
    }, getCommands(['/triage rejected']))

    await expect(postLabels).toHaveBeenCalledWith({labels: ['triage/rejected']})
    await expect(deleteLabels).toHaveBeenCalledWith('needs/triage')
  });

  it('should have comment when needs/triage is present and opened', async function () {
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: []
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
      needs: {
        comment: 'hello you'
      }
    }, getCommands())

    await expect(postLabels).toHaveBeenCalledWith({labels: ['needs/triage']})
    await expect(postComments).toHaveBeenCalledTimes(1)
    await expect(deleteLabels).not.toHaveBeenCalled()
  });

  it('should not have comment when needs/triage is present as its edited', async function () {
    github.context.payload = {
      action: 'edited',
      issue: {
        number: 1,
        labels: []
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
      needs: {
        comment: 'hello you'
      }
    }, getCommands())

    await expect(postLabels).toHaveBeenCalledWith({labels: ['needs/triage']})
    await expect(postComments).not.toHaveBeenCalled()
    await expect(deleteLabels).not.toHaveBeenCalled()
  });

  it('should not have commented', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: []
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
    }, getCommands())

    return expect(postComments).not.toHaveBeenCalled()
  });
})

describe('labels', () => {
  it('should have removed labels with comment', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: [{name: 'triage/accepted'}]
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted'],
    }, getCommands(['/triage-remove accepted']))

    await expect(postLabels).not.toHaveBeenCalled()
    await expect(deleteLabels).toHaveBeenCalledWith('triage/accepted')
  });

  it('should have added labels with comment', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: [{name: 'triage/accepted'}]
      }
    }

    await label({
      prefix: 'triage',
      list: ['accepted', 'a', 'b'],
    }, getCommands(['/triage a']))

    await expect(postLabels).toHaveBeenCalledWith({labels: ['triage/a']})
    await expect(postComments).not.toHaveBeenCalled()
    await expect(deleteLabels).not.toHaveBeenCalled()
  });

  it('should have added multiple labels with comment', async function () {
    github.context.payload = {
      issue: {
        number: 1,
        labels: []
      }
    }

    await label({
      prefix: 'triage',
      list: ['a', 'b', 'c'],
    }, getCommands(['/triage a c']))

    await expect(postLabels).toHaveBeenCalledWith({labels: ['triage/a', "triage/c"]})
    await expect(deleteLabels).not.toHaveBeenCalled()
  });

  describe('multiples', () => {
    it('false: should have one label', async function () {
      github.context.payload = {
        issue: {
          number: 1,
          labels: [{name: 'triage/b'}]
        }
      }

      await label({
        prefix: 'triage',
        list: ['a', 'b', 'c'],
        multiple: false
      }, getCommands(['/triage a c']))

      await expect(postLabels).toHaveBeenCalledWith({labels: ['triage/c']})
      await expect(deleteLabels).toHaveBeenCalledTimes(1)
      await expect(deleteLabels).toHaveBeenCalledWith('triage/b')
      await expect(postComments).not.toHaveBeenCalled()
    })

    it('true: should have many label', async function () {
      github.context.payload = {
        issue: {
          number: 1,
          labels: [{name: 'triage/b'}]
        }
      }

      await label({
        prefix: 'triage',
        list: ['a', 'b', 'c'],
        multiple: true
      }, getCommands(['/triage a c']))

      await expect(postLabels).toHaveBeenCalledWith({labels: ['triage/a', 'triage/c']})
      await expect(deleteLabels).not.toHaveBeenCalled()
      await expect(postComments).not.toHaveBeenCalled()
    })
  })
})
