import {ChatOps, Governance, Label} from "../config";
import {Commands} from "../command";

// import label from "./label";
// import close from "./close";
// import assign from "./assign";
// import review from "./review";
// import comment from "./comment";
// import dispatch from "./dispatch";

// TODO(fuxing): run operations

// TODO(fuxing): 3. parse chat-ops (access-control)
// TODO(fuxing): 4.1. run chat-ops (types)
// TODO(fuxing): 4.2. produce prefixed labels (add/remove)
// TODO(fuxing): 4.3. produce needs labels
// TODO(fuxing): 5. produce comments + generate available commands

async function labels(labels: Label[], commands: Commands): Promise<void> {
  for (const governanceLabel of labels) {
    // await label(governanceLabel, commands)
  }
}

async function chatOps(chatOps: ChatOps[], commands: Commands): Promise<void> {
  for (const chatOp of chatOps) {
    // switch (chatOp.type) {
    //   case 'close':
    //     await close(chatOp, commands)
    //     break
    //   case 'assign':
    //     await assign(chatOp, commands)
    //     break
    //   case 'review':
    //     await review(chatOp, commands)
    //     break
    //   case 'comment':
    //     await comment(chatOp, commands)
    //     break
    //   case 'dispatch':
    //     await dispatch(chatOp, commands)
    //     break
    // }
  }
}

export default async function (governance: Governance, commands: Commands): Promise<any> {
  if (governance.labels) {
    await labels(governance.labels, commands)
  }

  if (governance.chat_ops) {
    await chatOps(governance.chat_ops, commands)
  }
}
