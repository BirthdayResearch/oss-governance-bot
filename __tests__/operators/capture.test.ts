import * as core from "@actions/core";
import * as github from "@actions/github";
import nock from "nock";
import capture from "../../src/operators/capture";

const postLabels = jest.fn()

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
    .post('/repos/owner/repo/issues/1/labels')
    .reply(200, function (_, body) {
      postLabels(body)
      return {}
    }).persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

describe('pr/issue', () => {
  it('should capture os/mac regex', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: 1.0.0\r\n- Operating System:mac'
      }
    }
    await capture({
      regex: "- Operating System: *(macos|mac) *",
      label: 'os/mac'
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['os/mac']})
  });

  it('should capture os/win regex', async () => {
    github.context.eventName = 'pull_request'
    github.context.payload = {
      action: 'opened',
      pull_request: {
        number: 1,
        labels: [],
        body: '- Operating System: win\n- Version: 1.0.0'
      }
    }
    await capture({
      regex: "- Operating System: *(windows|window|win|win) *",
      label: 'os/win'
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['os/win']})
  });

  it('should capture windows regex', async () => {
    github.context.eventName = 'pull_request'
    github.context.payload = {
      action: 'opened',
      pull_request: {
        number: 1,
        labels: [],
        body: '- Operating System: windows \n- Version: 1.0.0'
      }
    }
    await capture({
      regex: "- Operating System: *(windows|window|win|win) *",
      label: 'os/win'
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['os/win']})
  });

  it('should fail capture due to uppercase', async () => {
    github.context.eventName = 'issue'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Operating System: LINUX \n- Version: 1.0.0'
      }
    }
    await capture({
      regex: "- Operating System: *(linux) *",
      label: 'os/linux'
    })
    await expect(postLabels).not.toHaveBeenCalled()
  });

  it('should fail capture due to uppercase', async () => {
    github.context.eventName = 'issue'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Operating System: LINUX \n- Version: 1.0.0'
      }
    }
    await capture({
      regex: "- Operating System: *(linux) *",
      label: 'os/linux',
      ignore_case: true
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['os/linux']})
  });

  it('should not capture nothing regex', async () => {
    github.context.eventName = 'pull_request'
    github.context.payload = {
      action: 'opened',
      pull_request: {
        number: 1,
        labels: [],
        body: '- Operating System: windows \n- Version: 1.0.0'
      }
    }
    await capture({
      regex: "- Operating System: *(nothing) *",
      label: 'os/nothing'
    })
    await expect(postLabels).not.toHaveBeenCalled()
  });
})

describe('comment', () => {
  it('should capture windows regex', async () => {
    github.context.eventName = 'issue_comment'
    github.context.payload = {
      action: 'created',
      comment: {
        id: 1,
        body: '- Operating System: windows \n- Version: 1.0.0'
      },
      issue: {
        number: 1
      }
    }
    await capture({
      regex: "- Operating System: *(windows|window|win|win) *",
      label: 'os/win'
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['os/win']})
  });

  it('should fail capture due to uppercase', async () => {
    github.context.eventName = 'issue_comment'
    github.context.payload = {
      action: 'created',
      comment: {
        id: 1,
        body: '- Operating System: LINUX \n- Version: 1.0.0'
      },
      issue: {
        number: 1
      }
    }
    await capture({
      regex: "- Operating System: *(linux) *",
      label: 'os/linux'
    })
    await expect(postLabels).not.toHaveBeenCalled()
  });
});

describe('version', () => {
  it('should capture replace', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: 1.0.0 \r\n- Operating System:mac'
      }
    }
    await capture({
      regex: "- Version: *(.+) *",
      label: 'version/$CAPTURED'
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['version/1.0.0']})
  });

  it('should capture replace with v', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: v1.5.0\r\n- Operating System:mac'
      }
    }
    await capture({
      regex: "- Version: *(.+) *",
      label: 'version/$CAPTURED'
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['version/v1.5.0']})
  });

  it('should capture replace uppercase', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: V1.5.0\r\n- Operating System:mac'
      }
    }
    await capture({
      regex: "- Version: *(.+) *",
      label: 'version/$CAPTURED',
      ignore_case: true
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['version/V1.5.0']})
  });

  it('should have v1.5.0 captured and validated and not missing', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: v1.5.0\r\n- Operating System:mac'
      }
    }

    nock('https://api.github.com')
      .get(/\/repos\/owner\/repo\/releases\/tags\/.+/)
      .reply(200, function (_, body) {
        const paths = this.req.path.split('/')
        return {
          tag_name: decodeURIComponent(paths[paths.length - 1])
        }
      })

    await capture({
      regex: "- Version: *(.+) *",
      label: 'v/$CAPTURED',
      github_release: true
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['v/1.5.0']})
  });

  it('should have 1.5.0 captured and validated', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: 1.5.0\r\n- Operating System:mac'
      }
    }

    nock('https://api.github.com')
      .get(/\/repos\/owner\/repo\/releases\/tags\/.+/)
      .reply(200, function (_, body) {
        const paths = this.req.path.split('/')
        return {
          tag_name: decodeURIComponent(paths[paths.length - 1])
        }
      })

    await capture({
      regex: "- Version: *(.+) *",
      label: 'v/$CAPTURED',
      github_release: true
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['v/1.5.0']})
  });

  it('should have 1.5.0 captured and validated but missing and then non prefixed v is valid', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: 1.5.0\r\n- Operating System:mac'
      }
    }

    nock('https://api.github.com')
      .get('/repos/owner/repo/releases/tags/v1.5.0')
      .reply(404, function (_, body) {
        return {}
      })

    nock('https://api.github.com')
      .get('/repos/owner/repo/releases/tags/1.5.0')
      .reply(200, function (_, body) {
        return {
          tag_name: '1.5.0'
        }
      })

    await capture({
      regex: "- Version: *(.+) *",
      label: 'v/$CAPTURED',
      github_release: true
    })
    await expect(postLabels).toHaveBeenCalledWith({labels: ['v/1.5.0']})
  });

  it('both version does not exist', async () => {
    github.context.eventName = 'issues'
    github.context.payload = {
      action: 'opened',
      issue: {
        number: 1,
        labels: [],
        body: '- Version: 1.5.0\r\n- Operating System:mac'
      }
    }

    nock('https://api.github.com')
      .get('/repos/owner/repo/releases/tags/v1.5.0')
      .reply(404, function (_, body) {
        return {}
      })

    nock('https://api.github.com')
      .get('/repos/owner/repo/releases/tags/1.5.0')
      .reply(404, function (_, body) {
        return {}
      })

    await capture({
      regex: "- Version: *(.+) *",
      label: 'v/$CAPTURED',
      github_release: true
    })
    await expect(postLabels).not.toHaveBeenCalled()
  });
})
