import {ChatOps, Governance, Label} from '../config'
import {Commands} from '../command'
import {isAuthorAssociationAllowed} from '../author-association'
import label from './label'
import chatOpsClose from './chat-ops/close'
import chatOpsComment from './chat-ops/comment'
import chatOpsAssign from './chat-ops/assign'
import chatOpsReview from './chat-ops/review'
import chatOpsLabel from './chat-ops/label'
import {isCreatedOpened} from '../ignore'

async function processLabels(
  labels: Label[],
  commands: Commands
): Promise<void> {
  for (const labelOp of labels) {
    if (isAuthorAssociationAllowed(labelOp.author_association)) {
      await label(labelOp, commands)
    }
  }
}

async function processChatOps(
  chatOps: ChatOps[],
  commands: Commands
): Promise<void> {
  if (!isCreatedOpened()) {
    return
  }

  for (const chatOp of chatOps) {
    if (!isAuthorAssociationAllowed(chatOp.author_association)) {
      continue
    }
    switch (chatOp.type) {
      case 'close':
        await chatOpsClose(chatOp, commands)
        break
      case 'assign':
        await chatOpsAssign(chatOp, commands)
        break
      case 'review':
        await chatOpsReview(chatOp, commands)
        break
      case 'comment':
        await chatOpsComment(chatOp, commands)
        break
      case 'label':
        await chatOpsLabel(chatOp, commands)
        break
    }
  }
}

export default async function (
  governance: Governance,
  commands: Commands
): Promise<any> {
  if (governance.labels?.length) {
    await processLabels(governance.labels, commands)
  }

  if (governance.chat_ops?.length) {
    await processChatOps(governance.chat_ops, commands)
  }
}
