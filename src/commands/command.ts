import { Message } from "discord.js";

export interface Command {

    name: string;
    authorizeBots: boolean;

    doPerform(message: Message)
}
