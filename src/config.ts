import {load} from 'js-yaml'
import * as t from 'io-ts'
import reporter from 'io-ts-reporters'
import {isRight} from 'fp-ts/Either'
import {GitHub} from '@actions/github/lib/utils'
import * as github from '@actions/github'

const Label = t.intersection([
  t.type({
    prefix: t.string,
    list: t.array(t.string)
  }),
  t.partial({
    multiple: t.boolean,
    contributor: t.boolean,
    needs: t.partial({
      comment: t.string
    })
  })
])

const CommentChatOps = t.type({
  cmd: t.string,
  type: t.literal('comment'),
  comment: t.string
})

const DispatchChatOps = t.type({
  cmd: t.string,
  type: t.literal('dispatch'),
  dispatch: t.string
})

const ChatOps = t.union([
  t.type({
    cmd: t.string,
    type: t.literal('close')
  }),
  t.type({
    cmd: t.string,
    type: t.literal('none')
  }),
  t.type({
    cmd: t.string,
    type: t.literal('assign')
  }),
  t.type({
    cmd: t.string,
    type: t.literal('review')
  }),
  CommentChatOps,
  DispatchChatOps
])

const Governance = t.partial({
  labels: t.array(Label),
  'chat-ops': t.array(ChatOps)
})

const Config = t.intersection([
  t.type({
    version: t.literal('v1')
  }),
  t.partial({
    issue: Governance,
    'pull-request': Governance
  })
])

/* eslint no-redeclare: off */
export type Label = t.TypeOf<typeof Label>
export type CommentChatOps = t.TypeOf<typeof CommentChatOps>
export type DispatchChatOps = t.TypeOf<typeof DispatchChatOps>
export type ChatOps = t.TypeOf<typeof ChatOps>
export type Governance = t.TypeOf<typeof Governance>
export type Config = t.TypeOf<typeof Config>

export function parse(content: string): Config {
  const config = load(content)

  const decoded = Config.decode(config)
  if (isRight(decoded)) {
    return decoded.right
  } else {
    throw new Error(
      `Config parse error:\\n${reporter.report(decoded).join('\\n')}`
    )
  }
}

/**
 * @param client used to get governance config from
 * @param configPath location of the config file
 */
export async function getConfig(
  client: InstanceType<typeof GitHub>,
  configPath: string
): Promise<Config> {
  const response: any = await client.repos.getContent({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    ref: github.context.sha,
    path: configPath
  })

  const content: string = Buffer.from(
    response.data.content,
    response.data.encoding
  ).toString()
  return parse(content)
}
