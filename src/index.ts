require('dotenv').config(); // Recommended way of loading dotenv

import { Bot } from "./bot";
import { Client } from "discord.js";
import { ConfigManager } from "./config-manager";

const configManager = new ConfigManager();
const bot = new Bot(new Client(), process.env.TOKEN, configManager);

bot.listen().then(() => {
    console.log("Online!")
}).catch((error) => {
    console.log('Oh no! ', error)
});