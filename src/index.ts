require('dotenv').config(); // Recommended way of loading dotenv
import "reflect-metadata";
import { Bot } from "./bot";
import { Client } from "discord.js";

const bot = new Bot(new Client(), process.env.TOKEN);

bot.listen().then(() => {
    console.log("Online!")
}).catch((error) => {
    console.log('Oh no! ', error)
});