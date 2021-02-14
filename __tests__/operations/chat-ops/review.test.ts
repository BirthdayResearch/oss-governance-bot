import review from '../../../src/operations/chat-ops/review'
import {Command, Commands} from "../../../src/command";
import * as github from "@actions/github";
import * as core from "@actions/core";
import nock from "nock";

const postRequestedReviewers = jest.fn()

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
    .post('/repos/owner/repo/pulls/1/requested_reviewers')
    .reply(200, function (_, body) {
      postRequestedReviewers(body)
      return {}
    }).persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

async function runOp(cmd: string, list: string[] = [], others: any = {}) {
  const commands = new Commands(list.map(t => new Command((t))))

  await review({
    cmd: cmd,
    type: 'review',
    ...others,
  }, commands)
}

it('should assign with /review @fuxing', async () => {
  await runOp('/review', ['/review @fuxing'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["fuxing"]})
});

it('should assign with /review @fuxing @clarie', async () => {
  await runOp('/review', ['/review @fuxing @clarie'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["fuxing", "clarie"]})
});

it('should assign with /review @fuxing @clarie @john', async () => {
  await runOp('/review', ['/review @fuxing @clarie @john'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["fuxing", "clarie", "john"]})
});


it('should not assign with /review fuxing', async () => {
  await runOp('/review', ['/review fuxing'])
  await expect(postRequestedReviewers).not.toHaveBeenCalled()
});

it('should not assign with /review fuxing abc', async () => {
  await runOp('/review', ['/review fuxing abc'])
  await expect(postRequestedReviewers).not.toHaveBeenCalled()
});

it('should not assign with /review to @fuxing', async () => {
  await runOp('/review', ['/review to @fuxing'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["fuxing"]})
});

it('should assign with /ask', async () => {
  await runOp('/ask', ['/ask @fuxing'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["fuxing"]})
});

it('should not close with /nah', async () => {
  await runOp('/nah', ['/review @fuxing'])
  await expect(postRequestedReviewers).not.toHaveBeenCalled()
});
