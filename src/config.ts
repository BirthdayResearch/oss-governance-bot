import {load} from 'js-yaml'
import * as t from 'io-ts'
import reporter from 'io-ts-reporters'
import {isRight} from 'fp-ts/Either'
import {GitHub} from '@actions/github/lib/utils'
import * as github from '@actions/github'

const AuthorAssociation = t.partial({
  // Author of issue or pull_request
  author: t.boolean,
  // Author has been invited to collaborate on the repository.
  collaborator: t.boolean,
  // Author has previously committed to the repository.
  contributor: t.boolean,
  // Author has not previously committed to GitHub.
  first_timer: t.boolean,
  // Author has not previously committed to the repository.
  first_time_contributor: t.boolean,
  // Author is a placeholder for an unclaimed user.
  mannequin: t.boolean,
  // Author is a member of the organization that owns the repository.
  member: t.boolean,
  // Author has no association with the repository.
  none: t.boolean,
  // Author is the owner of the repository.
  owner: t.boolean
})

const Label = t.intersection([
  t.type({
    prefix: t.string,
    list: t.array(t.string)
  }),
  t.partial({
    multiple: t.boolean,
    author_association: AuthorAssociation,
    needs: t.union([
      t.boolean,
      t.partial({
        comment: t.string,
        status: t.intersection([
          t.type({
            context: t.string
          }),
          t.partial({
            url: t.string,
            description: t.union([
              t.string,
              t.partial({
                success: t.string,
                failure: t.string
              })
            ])
          })
        ])
      })
    ])
  })
])

const Capture = t.intersection([
  t.type({
    regex: t.string,
    label: t.string
  }),
  t.partial({
    author_association: AuthorAssociation,
    ignore_case: t.boolean,
    github_release: t.boolean
  })
])

const CommentChatOps = t.intersection([
  t.type({
    cmd: t.string,
    type: t.literal('comment'),
    comment: t.string
  }),
  t.partial({
    author_association: AuthorAssociation
  })
])

const LabelChatOps = t.intersection([
  t.type({
    cmd: t.string,
    type: t.literal('label'),
    label: t.partial({
      add: t.union([t.string, t.array(t.string)]),
      remove: t.union([t.string, t.array(t.string)])
    })
  }),
  t.partial({
    author_association: AuthorAssociation
  })
])

const GenericChatOps = t.intersection([
  t.type({
    cmd: t.string,
    type: t.keyof({
      close: null,
      none: null,
      assign: null,
      review: null
    })
  }),
  t.partial({
    author_association: AuthorAssociation
  })
])

const ChatOps = t.union([GenericChatOps, LabelChatOps, CommentChatOps])

const CollaboratorAliasList = t.array(t.string)

const Automations = t.partial({
  autoAssignAnyFrom: CollaboratorAliasList
})

const Governance = t.partial({
  labels: t.array(Label),
  captures: t.array(Capture),
  chat_ops: t.array(ChatOps),
  automations: Automations
})

const Config = t.intersection([
  t.type({
    version: t.literal('v1')
  }),
  t.partial({
    issue: Governance,
    pull_request: Governance
  })
])

/* eslint no-redeclare: off */
export type Label = t.TypeOf<typeof Label>
export type Capture = t.TypeOf<typeof Capture>
export type AuthorAssociation = t.TypeOf<typeof AuthorAssociation>
export type CommentChatOps = t.TypeOf<typeof CommentChatOps>
export type LabelChatOps = t.TypeOf<typeof LabelChatOps>
export type GenericChatOps = t.TypeOf<typeof GenericChatOps>
export type ChatOps = t.TypeOf<typeof ChatOps>
export type Governance = t.TypeOf<typeof Governance>
export type Config = t.TypeOf<typeof Config>

function parse(content: string): Config {
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
