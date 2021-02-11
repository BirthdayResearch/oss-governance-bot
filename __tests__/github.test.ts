import {postComment} from '../src/github'
import * as core from '@actions/core'
import * as github from '@actions/github'
import nock from 'nock'

const postComments = jest.fn()

beforeAll(() => {
  jest.spyOn(core, 'getInput').mockImplementation(name => {
    return 'config-path/location.yml'
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
    })
    .persist()
})

afterAll(() => {
  jest.clearAllMocks()
})

it('should format details as expected', async () => {
  github.context.payload = {
    issue: {
      number: 1,
      labels: []
    },
    repository: {
      name: 'Hello-World',
      owner: {
        login: 'Codertocat',
        html_url: 'https://github.com/Codertocat/'
      },
      html_url: 'https://github.com/Codertocat/Hello-World'
    }
  }

  await postComment('a')
  await expect(postComments).toHaveBeenCalledWith({
    body:
      'a\n' +
      '<details><summary>Details</summary>\n' +
      'I am a bot created to help the [Codertocat](https://github.com/Codertocat/) developers manage community feedback and contributions. You can check out my [manifest file](https://github.com/Codertocat/Hello-World/blob/master/config-path/location.yml) to understand my behavior and what I can do. If you want to use this for your project, you can check out the [fuxingloh/oss-governance](https://github.com/fuxingloh/oss-governance) repository.\n' +
      '</details>'
  })
})
