import { Client, Message } from "discord.js";
import { AddReaction, Command } from "../commands";
import { ConfigManager } from "./config-manager";
import { container } from "tsyringe";

export class CommandManager {

    private readonly commands: Command[] = [new AddReaction()]

    constructor(client: Client) {
        const configManager = container.resolve(ConfigManager);
        client.on('message', (message: Message) => {
            if (message.content.startsWith(configManager.config.prefix))
                if (!message.author.bot) {
                    this.commands.filter(x => !x.authorizeBots).forEach(command => {
                        if (message.content.startsWith(configManager.config.prefix + command.name)) {
                            command.doPerform(message);
                        }
                    })
                }
        })
    }
}