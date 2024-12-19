import { userState } from "@/vars/state";
import { CommandContext, Context } from "grammy";

export async function checkBanCommand(ctx: CommandContext<Context>) {
  const user = ctx.chat.id;
  const text = "Send the username you want to check shadowban for";
  ctx.reply(text);
  userState[user] = "sendUsername";
}
