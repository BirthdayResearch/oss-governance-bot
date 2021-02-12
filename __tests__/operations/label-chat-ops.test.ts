import labelChatOps from '../../src/operations/label-chat-ops'
import {Command, Commands} from "../../src/command";
import * as github from "@actions/github";
import * as core from "@actions/core";
import nock from "nock";
import {addLabels} from "../../src/github";

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

  github.context.payload = {
    issue: {
      number: 1
    }
  }

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

async function runOp(cmd: string, list: string[] = [], others: any = {}) {
  const commands = new Commands(list.map(t => new Command((t))))

  await labelChatOps({
    cmd: cmd,
    type: 'label',
    ...others,
  }, commands)
}

it('should have added label with /label me', async () => {
  await runOp('/label me', ['/label me'], {
    label: {
      add: 'me-2'
    }
  })
  await expect(postLabels).toHaveBeenCalledWith({"labels": ['me-2']})
});

it('should have added 2 labels with /label me', async () => {
  await runOp('/label me', ['/label me'], {
    label: {
      add: ['me-1', 'me-2']
    }
  })
  await expect(postLabels).toHaveBeenCalledWith({"labels": ['me-1', 'me-2']})
});

it('should have removed label with /label me', async () => {
  await runOp('/label me', ['/label me'], {
    label: {
      remove: 'me-2'
    }
  })
  await expect(deleteLabels).toHaveBeenCalledWith('me-2')
});

it('should have removed 2 labels with /label me', async () => {
  await runOp('/label me', ['/label me'], {
    label: {
      remove: ['me-1', 'me-2']
    }
  })
  await expect(deleteLabels).toHaveBeenCalledWith('me-1')
  await expect(deleteLabels).toHaveBeenCalledWith('me-2')
  await expect(deleteLabels).toHaveBeenCalledTimes(2)
});

it('should have add 3 removed 2 labels with /label abc', async () => {
  await runOp('/label abc', ['/label abc'], {
    label: {
      add: ['add-1', 'add-2', 'add-3'],
      remove: ['remove-1', 'remove-2'],
    }
  })

  await expect(postLabels).toHaveBeenCalledWith({"labels": ['add-1', 'add-2', 'add-3']})
  await expect(deleteLabels).toHaveBeenCalledWith('remove-1')
  await expect(deleteLabels).toHaveBeenCalledWith('remove-2')
  await expect(deleteLabels).toHaveBeenCalledTimes(2)
});

it('should have add 1 removed 2 labels with /label abc', async () => {
  await runOp('/label abc', ['/label abc'], {
    label: {
      add: 'add-5',
      remove: ['remove-1', 'remove-2'],
    }
  })

  await expect(postLabels).toHaveBeenCalledWith({"labels": ['add-5']})
  await expect(deleteLabels).toHaveBeenCalledWith('remove-1')
  await expect(deleteLabels).toHaveBeenCalledWith('remove-2')
  await expect(deleteLabels).toHaveBeenCalledTimes(2)
});
