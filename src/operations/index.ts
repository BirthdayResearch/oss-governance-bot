import {ChatOps, Governance, Label} from '../config'
import {Commands} from '../command'
import label from './label'
import {isAuthorAssociationAllowed} from './author-association'
import close from './close'
import comment from './comment'
import assign from './assign'
import review from './review'
import labelChatOps from './label-chat-ops'

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
  for (const chatOp of chatOps) {
    if (!isAuthorAssociationAllowed(chatOp.author_association)) {
      continue
    }
    switch (chatOp.type) {
      case 'close':
        await close(chatOp, commands)
        break
      case 'assign':
        await assign(chatOp, commands)
        break
      case 'review':
        await review(chatOp, commands)
        break
      case 'comment':
        await comment(chatOp, commands)
        break
      case 'label':
        await labelChatOps(chatOp, commands)
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