import { Message } from "discord.js";
import { container } from "tsyringe";
import { ConfigManager } from "../modules/config-manager";
import { Command } from "./command";

export class AddReaction implements Command {
    private _name: string = "autoreact";
    private _authBots = false;

    public get authorizeBots(): boolean {
        return this._authBots;
    }

    public get name(): string {
        return this._name
    }

    public doPerform(message: Message): void {
        const configManager = container.resolve(ConfigManager);
        let args: string[] = message.content.split(' ');
        args.shift();
        if (args.length < 1) {
            message.react("⚠")
            message.reply("!autoreact <remove{boolean}> Emote Emote Emote ...")
            return;
        }
        let remove = false;
        if (args[0].toLocaleLowerCase() === 'true' || args[0].toLowerCase() === 'false' || args[0].toLowerCase() === 'remove') {
            if (args[0].toLocaleLowerCase() === 'true' || args[0].toLowerCase() === 'remove') {
                remove = true; console.log('removing');
            }
            args.shift();
        }
        const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
        const emojis = args.filter(x => x.match(regexExp));
        if (emojis.length < 1) {
            message.react("⚠")
            message.reply("No emojis were provided. ⚠")
            return;
        }
        const config = configManager.config.autoreacts.find(x => x.channelId === message.channel.id);
        if (!remove) {
            if (!config) {
                configManager.config.autoreacts.push(
                    {
                        channelId: message.channel.id,
                        icons: emojis
                    });
            } else {
                config.icons = config.icons.filter(x => !emojis.find(y => y === x)).concat(emojis)
            }
        } else {
            config.icons = config.icons.filter(x => !emojis.find(y => x === y));
        }

        configManager.saveConfig();
        message.channel.send(remove ? "Removed successfully." : "Added successfully.")
    }

}