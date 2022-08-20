import { CommentChatOps } from '../../config';
import { Commands } from '../../command';
import { postComment } from '../../github';

export default async function (chatOps: CommentChatOps, commands: Commands): Promise<void> {
  const matched = commands.prefix(chatOps.cmd);
  if (!matched.length) {
    return;
  }

  await postComment(chatOps.comment);
}
