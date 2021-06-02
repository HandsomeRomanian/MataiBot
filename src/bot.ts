import { Client, Message } from "discord.js";
import { container } from "tsyringe";
import { ConfigManager } from "./modules/config-manager";
import { CommandManager } from "./modules/command-manager";

export class Bot {
    private _client: Client;
    private readonly token: string;
    private readonly _commandManager: CommandManager;

    private readonly configManager: ConfigManager;

    constructor(client: Client, token: string) {
        this._client = client;
        this.configManager = container.resolve(ConfigManager);
        this.token = token;
        this._commandManager = new CommandManager(this._client);
    }

    public get client(): Client {
        return this._client;
    }

    public listen(): Promise<string> {
        this._client.on('message', (message: Message) => {
            if (!message.author.bot) {
                this.configManager.config.autoreacts.find(x => x.channelId == message.channel.id)?.icons?.forEach(x => {
                    message.react(x);
                })
            }
        });
        return this._client.login(this.token);
    }
}