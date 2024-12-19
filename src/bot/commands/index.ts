import { teleBot } from "@/index";
import { startBot } from "./start";
import { log } from "@/utils/handlers";
import { executeStep } from "../executeStep";
import { CommandContext, Context } from "grammy";
import { checkBanCommand } from "./checkBan";

export function initiateBotCommands() {
  teleBot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "checkban", description: "To check shadowban for a username" },
  ]);

  teleBot.command("start", (ctx) => startBot(ctx));
  teleBot.command("checkban", (ctx) => checkBanCommand(ctx));

  teleBot.on(["message"], (ctx) => {
    executeStep(ctx as CommandContext<Context>);
  });

  log("Bot commands up");
}
