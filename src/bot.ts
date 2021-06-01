import { Client, Message } from "discord.js";
import { ConfigManager } from "./config-manager";

export class Bot {
    private _client: Client;
    private readonly token: string;

    private readonly configManager: ConfigManager;

    constructor(client: Client, token: string, configManagerIn: ConfigManager) {
        this._client = client;
        this.configManager = configManagerIn;
        this.token = token;
    }

    public get client(): Client {
        return this._client;
    }

    public listen(): Promise<string> {
        this._client.on('message', (message: Message) => {
            if (!message.author.bot) {
                this.configManager.config.autoreacts.find(x => x.channelId == message.channel.id).icons?.forEach(x => {
                    message.react(x);
                })
            }
        });
        return this._client.login(this.token);
    }
}