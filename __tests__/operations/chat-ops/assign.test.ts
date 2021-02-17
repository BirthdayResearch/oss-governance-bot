import assign from '../../../src/operations/chat-ops/assign'
import {Command, Commands} from "../../../src/command";
import * as github from "@actions/github";
import * as core from "@actions/core";
import nock from "nock";

const postAssignees = jest.fn()

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
    .post('/repos/owner/repo/issues/1/assignees')
    .reply(200, function (_, body) {
      postAssignees(body)
      return {}
    }).persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

async function runOp(cmd: string, list: string[] = [], others: any = {}) {
  const commands = new Commands(list.map(t => new Command((t))))

  await assign({
    cmd: cmd,
    type: 'assign',
    ...others,
  }, commands)
}

it('should assign with /assign @jenny', async () => {
  await runOp('/assign', ['/assign @jenny'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["jenny"]})
});

it('should assign with /assign @jenny @clarie', async () => {
  await runOp('/assign', ['/assign @jenny @clarie'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["jenny", "clarie"]})
});

it('should not assign with /assign jenny', async () => {
  await runOp('/assign', ['/assign jenny'])
  await expect(postAssignees).not.toHaveBeenCalled()
});

it('should not assign with /assign jessica abc', async () => {
  await runOp('/assign', ['/assign jessica abc'])
  await expect(postAssignees).not.toHaveBeenCalled()
});

it('should not assign with /assign to @jessica', async () => {
  await runOp('/assign', ['/assign to @jessica'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["jessica"]})
});

it('should assign with /forward', async () => {
  await runOp('/forward', ['/forward @jessica'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["jessica"]})
});

it('should not close with /nah', async () => {
  await runOp('/nah', ['/assign @jessica'])
  await expect(postAssignees).not.toHaveBeenCalled()
});
