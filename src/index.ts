import { Bot } from "grammy";
import { initiateBotCommands, initiateCallbackQueries } from "./bot";
import { log } from "./utils/handlers";
import { BOT_TOKEN } from "./utils/env";

export const teleBot = new Bot(BOT_TOKEN || "");
log("Bot instance ready");

(async function () {
  teleBot.start();
  log("Telegram bot setup");
  initiateBotCommands();
  initiateCallbackQueries();
})();
