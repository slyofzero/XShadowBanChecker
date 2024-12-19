import { BOT_USERNAME } from "@/utils/env";
import { CommandContext, Context } from "grammy";

export async function startBot(ctx: CommandContext<Context>) {
  const text = `*Welcome to ${BOT_USERNAME}\\!\\!\\!*\n\n

To perform shadowban check - /checkban`;
  await ctx.reply(text, { parse_mode: "MarkdownV2" });
}
