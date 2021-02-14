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

it('should assign with /assign @fuxing', async () => {
  await runOp('/assign', ['/assign @fuxing'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["fuxing"]})
});

it('should assign with /assign @fuxing @clarie', async () => {
  await runOp('/assign', ['/assign @fuxing @clarie'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["fuxing", "clarie"]})
});

it('should not assign with /assign fuxing', async () => {
  await runOp('/assign', ['/assign fuxing'])
  await expect(postAssignees).not.toHaveBeenCalled()
});

it('should not assign with /assign fuxing abc', async () => {
  await runOp('/assign', ['/assign fuxing abc'])
  await expect(postAssignees).not.toHaveBeenCalled()
});

it('should not assign with /assign to @fuxing', async () => {
  await runOp('/assign', ['/assign to @fuxing'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["fuxing"]})
});

it('should assign with /foward', async () => {
  await runOp('/forward', ['/forward @fuxing'])
  await expect(postAssignees).toHaveBeenCalledWith({"assignees": ["fuxing"]})
});

it('should not close with /nah', async () => {
  await runOp('/nah', ['/assign @fuxing'])
  await expect(postAssignees).not.toHaveBeenCalled()
});
