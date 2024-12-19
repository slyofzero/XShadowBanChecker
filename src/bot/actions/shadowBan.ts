import { getShadowBanData } from "@/utils/shadowban";
import { userState } from "@/vars/state";
import { CommandContext, Context } from "grammy";

export async function getUsername(ctx: CommandContext<Context>) {
  delete userState[ctx.chat.id];
  const username = ctx.message?.text;
  if (!username) {
    return ctx.reply("Please enter a valid username.");
  }

  ctx.api.sendChatAction(ctx.chatId, "typing");

  const banData = await getShadowBanData(username);

  if (!banData) {
    return ctx.reply(
      "Couldn't do tests for your username, please try after some time."
    );
  }

  const safe_unsafe = (ban: boolean) =>
    ban === undefined ? "Couldn't do tests" : !ban ? "*Safe*" : "*Unsafe*";
  const metric =
    Object.values(banData)
      .filter((val) => val !== undefined)
      .map((val) => Number(!val))
      .reduce((a, b) => a + b) + Number(banData.profile_exists);

  const reply = `Shadowban scan for [@${username}](https://x.com/${username})

Profile Exists : ${banData.profile_exists ? "✅" : "❌"}
Search Ban : ${safe_unsafe(banData.search_ban)}
Suggestion Ban : ${safe_unsafe(banData.suggestion_ban)}
Ghost Ban : ${safe_unsafe(banData.ghost_ban)}
Reply Deboosting : ${safe_unsafe(banData.reply_deboosting)}

Overall Metric \\- ${metric}/5`;

  return ctx.reply(reply, { parse_mode: "MarkdownV2" });
}
