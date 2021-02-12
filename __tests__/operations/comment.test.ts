import comment from '../../src/operations/comment'
import {Command, Commands} from "../../src/command";
import * as github from "@actions/github";
import * as core from "@actions/core";
import nock from "nock";

const postComments = jest.fn()


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

  github.context.payload = {
    issue: {
      number: 1
    }
  }

  nock('https://api.github.com')
    .post('/repos/owner/repo/issues/1/comments')
    .reply(200, function (_, body) {
      postComments(body)
      return {}
    }).persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

async function runOp(cmd: string, list: string[] = [], others: any = {}) {
  const commands = new Commands(list.map(t => new Command((t))))

  await comment({
    cmd: cmd,
    type: 'comment',
    ...others,
  }, commands)
}

it('should comment with /comment', async () => {
  await runOp('/comment', ['/comment'], {
    comment: '@$AUTHOR: Hey this is comment example.'
  })
  await expect(postComments).toHaveBeenCalled()
});

it('should comment with /comment-it', async () => {
  await runOp('/comment-it', ['/comment-it'], {
    comment: '@$AUTHOR: Hey this is comment example.'
  })
  await expect(postComments).toHaveBeenCalled()
});

it('should not comment with /nah', async () => {
  await runOp('/nah', ['/comment'], {
    comment: '@$AUTHOR: Hey this is comment example.'
  })
  await expect(postComments).not.toHaveBeenCalled()
});
