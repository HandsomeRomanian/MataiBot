import { Client, Message } from "discord.js";
import { ConfigManager } from "./config-manager";

export class Bot {
    private client: Client;
    private readonly token: string;

    private readonly configManager: ConfigManager;

    constructor(client: Client, token: string, configManagerIn: ConfigManager) {
        this.client = client;
        this.configManager = configManagerIn;
        this.token = token;
    }

    public listen(): Promise<string> {
        this.client.on('message', (message: Message) => {
            if (!message.author.bot) {
                this.configManager.config.autoreacts.find(x => x.channelId == message.channel.id).icons?.forEach(x => {
                    message.react(x);
                })
            }
        });
        return this.client.login(this.token);
    }
}