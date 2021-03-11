import close from '../../../src/operators/chat-ops/close'
import {Command, Commands} from "../../../src/command";
import * as github from "@actions/github";
import * as core from "@actions/core";
import nock from "nock";

const patchIssue = jest.fn()

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
    .patch('/repos/owner/repo/issues/1')
    .reply(200, function (_, body) {
      patchIssue(body)
      return {}
    }).persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

async function runOp(cmd: string, list: string[] = [], others: any = {}) {
  const commands = new Commands(list.map(t => new Command((t))))

  await close({
    cmd: cmd,
    type: 'close',
    ...others,
  }, commands)
}

it('should close with /close', async () => {
  await runOp('/close', ['/close'])
  await expect(patchIssue).toHaveBeenCalledWith({"state": "closed"})
});

it('should close with /close-it', async () => {
  await runOp('/close-it', ['/close-it'])
  await expect(patchIssue).toHaveBeenCalledWith({"state": "closed"})
});

it('should not close with /nah', async () => {
  await runOp('/nah', ['/close'])
  await expect(patchIssue).not.toHaveBeenCalled()
});
