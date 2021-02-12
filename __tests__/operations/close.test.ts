import close from '../../src/operations/close'
import {Command, Commands} from "../../src/command";
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

function getCommands(list: string[] = []): Commands {
  return new Commands(list.map(t => new Command((t))))
}

it('should close with /close', async () => {
  await close({cmd: '/close', type: 'close'}, getCommands(['/close']))
  await expect(patchIssue).toHaveBeenCalledWith({"state": "closed"})
});

it('should close with /close-it', async () => {
  await close({cmd: '/close-it', type: 'close'}, getCommands(['/close-it']))
  await expect(patchIssue).toHaveBeenCalledWith({"state": "closed"})
});

it('should not close with /nah', async () => {
  await close({cmd: '/nah', type: 'close'}, getCommands(['/close']))
  await expect(patchIssue).not.toHaveBeenCalled()
});
