import command, {Commands, getCommands} from '../src/command'
import * as github from '@actions/github'

describe('getCommands', () => {
  function expectCommands(body: string, commands: string[]) {
    github.context.payload = {
      issue: {
        number: 1,
        body: body
      }
    }

    expect(getCommands().map(cmd => cmd.text)).toStrictEqual(commands)
  }

  it('multi line', () => {
    expectCommands('/area ui/ux\n/needs label', ['/area ui/ux', '/needs label'])
  })

  it('ignore text', () => {
    expectCommands('just some text', [])
  })

  it('ignore after start of line', () => {
    expectCommands('just some text /close', [])
  })

  it('authors 2nd line', () => {
    expectCommands('just some text\n/review @me @you', ['/review @me @you'])
  })

  it('authors 1st line', () => {
    expectCommands('/review @me @you\njust some text', ['/review @me @you'])
  })

  it('/middle', function () {
    expectCommands('first\n/middle\nthird', ['/middle'])
  })

  it('/second /third', function () {
    expectCommands('first\n/second\n/third', ['/second', '/third'])
  })

  it('brbr /cmd', function () {
    expectCommands('\n\n/second', ['/second'])
  })

  describe('issue', () => {
    function expectCommands(body: string, commands: string[]) {
      github.context.payload = {
        issue: {
          number: 1,
          body: body
        }
      }

      expect(getCommands().map(value => value.text)).toStrictEqual(commands)
    }

    it('/issue basic', () => {
      expectCommands('/issue basic', ['/issue basic'])
    })
  })

  describe('pull_request', () => {
    function expectCommands(body: string, commands: string[]) {
      github.context.payload = {
        pull_request: {
          number: 1,
          body: body
        }
      }

      expect(getCommands().map(value => value.text)).toStrictEqual(commands)
    }

    it('/pull request', () => {
      expectCommands('/pull request', ['/pull request'])
    })
  })

  describe('issue_comment', () => {
    function expectCommands(body: string, commands: string[]) {
      github.context.payload = {
        comment: {
          id: 1,
          body: body
        }
      }

      expect(getCommands().map(value => value.text)).toStrictEqual(commands)
    }

    it('/issue', () => {
      expectCommands('/issue 123', ['/issue 123'])
    })
  })
})

describe('commands', () => {
  async function getCommands(body: string): Promise<Commands> {
    github.context.payload = {
      issue: {
        number: 1,
        body: body
      }
    }

    return await command()
  }

  it('should multi line', async () => {
    const commands = await getCommands('/area ui/ux\n/needs label')

    expect(commands.prefix('/area').length).toBeTruthy()
    expect(commands.prefix('/area')[0].args[0]).toBe('ui/ux')
    expect(commands.prefix('/needs').length).toBeTruthy()
    expect(commands.prefix('/needs')[0].args[0]).toBe('label')
  })

  it('should authors', async () => {
    const commands = await getCommands('/review @jess @tommy')

    expect(commands.prefix('@jess').length).toBeFalsy()
    expect(commands.prefix('@tommy').length).toBeFalsy()
    expect(commands.prefix('/review').length).toBeTruthy()
    expect(commands.prefix('/review @jess').length).toBeTruthy()
    expect(commands.prefix('/review @jess')[0].args).toStrictEqual(['@tommy'])
    expect(commands.prefix('/review')[0].args).toStrictEqual([
      '@jess',
      '@tommy'
    ])
  })

  it('should args', async () => {
    const commands = await getCommands('no\n/why a b c\nnah')

    expect(commands.prefix('no').length).toBeFalsy()
    expect(commands.prefix('nah').length).toBeFalsy()
    expect(commands.prefix('/why').length).toBeTruthy()
    expect(commands.prefix('/why a').length).toBeTruthy()
    expect(commands.prefix('/why a b').length).toBeTruthy()
    expect(commands.prefix('/why a b c').length).toBeTruthy()
    expect(commands.prefix('/why')[0].args).toStrictEqual(['a', 'b', 'c'])
    expect(commands.prefix('/why a')[0].args).toStrictEqual(['b', 'c'])
  })

  describe('issue', () => {
    it('should /issue abc', async function () {
      github.context.payload = {
        issue: {
          number: 1,
          body: '/issue abc'
        }
      }

      const commands = await command()
      expect(commands.prefix('/not abc').length).toBeFalsy()
      expect(commands.prefix('/issue abc').length).toBeTruthy()
      expect(commands.prefix('/issue').length).toBeTruthy()
      expect(commands.prefix('/ussue abc 123').length).toBeFalsy()
    })
  })

  describe('pull_request', () => {
    it('should /pull request', async function () {
      github.context.payload = {
        pull_request: {
          number: 1,
          body: '/pull request'
        }
      }

      const commands = await command()
      expect(commands.prefix('/not request').length).toBeFalsy()
      expect(commands.prefix('/pull request').length).toBeTruthy()
      expect(commands.prefix('/pull').length).toBeTruthy()
      expect(commands.prefix('/pull request 123').length).toBeFalsy()
    })
  })

  describe('issue_comment', () => {
    it('should /issue 123', async () => {
      github.context.payload = {
        comment: {
          id: 1,
          body: '/issue 123'
        }
      }

      const commands = await command()
      expect(commands.prefix('/issue not').length).toBeFalsy()
      expect(commands.prefix('/issue').length).toBeTruthy()
      expect(commands.prefix('/issue 123').length).toBeTruthy()
      expect(commands.prefix('/issue 1234').length).toBeFalsy()
    })
  })
})

describe('ignore comments', () => {
  async function getCommands(body: string): Promise<Commands> {
    github.context.payload = {
      issue: {
        number: 1,
        body: body
      }
    }

    return await command()
  }

  it('should ignore comments for CR', async () => {
    const commands = await getCommands('' + '<!--\r' + '/needs label\r' + '-->')

    expect(commands.prefix('/needs').length).toBeFalsy()
  })

  it('should ignore comments for LF', async () => {
    const commands = await getCommands('' + '<!--\n' + '/needs label\n' + '-->')

    expect(commands.prefix('/needs').length).toBeFalsy()
  })

  it('should ignore comments for CR + LF', async () => {
    const commands = await getCommands(
      '' + '<!--\r\n' + '/needs label\r\n' + '-->'
    )

    expect(commands.prefix('/needs').length).toBeFalsy()
  })

  it('should ignore comments longer', async () => {
    const body =
      '<!--  Thanks for sending a pull request! -->\r\n' +
      '\r\n' +
      '#### What kind of PR is this?:\r\n' +
      '<!--\n' +
      'Use one of the following kinds:\r\n' +
      '/kind feature\r\n' +
      '/kind fix\r\n' +
      '/kind chore\r\n' +
      '/kind docs\r\n' +
      '/kind refactor\r\n' +
      '-->\r\n' +
      '\r\n' +
      '/kind \r\n' +
      '\r\n' +
      '#### What this PR does / why we need it:\r\n' +
      '\r\n' +
      '#### Which issue(s) does this PR fixes?:\r\n' +
      '<!--\r\n' +
      '(Optional) Automatically closes linked issue when PR is merged.\r\n' +
      'Usage: `Fixes #<issue number>`, or `Fixes (paste link of issue)`.\r\n' +
      '-->\r\n' +
      'Fixes #\r\n' +
      '\r\n' +
      '#### Additional comments?:\r\n'

    const commands = await getCommands(body)
    expect(commands.commands.length).toBe(1)
  })
})
