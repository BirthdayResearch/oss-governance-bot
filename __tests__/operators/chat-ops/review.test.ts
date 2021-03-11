import review from '../../../src/operators/chat-ops/review'
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

it('should assign with /review @jess', async () => {
  await runOp('/review', ['/review @jess'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["jess"]})
});

it('should assign with /review @thunder @clarie', async () => {
  await runOp('/review', ['/review @thunder @clarie'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["thunder", "clarie"]})
});

it('should assign with /review @DeFiChDeveloper @thunder @john', async () => {
  await runOp('/review', ['/review @DeFiChDeveloper @thunder @john'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["DeFiChDeveloper", "thunder", "john"]})
});


it('should not assign with /review jenny', async () => {
  await runOp('/review', ['/review jenny'])
  await expect(postRequestedReviewers).not.toHaveBeenCalled()
});

it('should not assign with /review jenny abc', async () => {
  await runOp('/review', ['/review jenny abc'])
  await expect(postRequestedReviewers).not.toHaveBeenCalled()
});

it('should not assign with /review to @jenny', async () => {
  await runOp('/review', ['/review to @jenny'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["jenny"]})
});

it('should assign with /ask', async () => {
  await runOp('/ask', ['/ask @jenny'])
  await expect(postRequestedReviewers).toHaveBeenCalledWith({"reviewers": ["jenny"]})
});

it('should not close with /nah', async () => {
  await runOp('/nah', ['/review @jenny'])
  await expect(postRequestedReviewers).not.toHaveBeenCalled()
});
