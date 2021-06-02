import { Message } from "discord.js";
import { Command } from "./command";

export class Ping implements Command {
    private _name: string = "ping";
    private _authBots = false;

    public get authorizeBots(): boolean {
        return this._authBots;
    }

    public get name(): string {
        return this._name
    }

    public async doPerform(message: Message): Promise<void> {
        const m = await message.channel.send("Calculating!");
        m.edit(
            `Pong! My latency is ${m.createdTimestamp - message.createdTimestamp}ms.`
        );
    }

}