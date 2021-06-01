import { AutoReact } from "./models/autoreact";
import { readFile, writeFile } from "fs";

export class ConfigManager {

    private _config: Config = new Config();
    private _path: string = "./src/config.json";

    constructor() {
        readFile(this._path, (err, data) => {
            if (err?.errno == -4058) {
                const out = JSON.stringify(this._config);
                writeFile(this._path, out as string, (err) => {
                    if (err) console.log('error', err);
                });
            } else {
                this._config = JSON.parse(data.toString());
            }
        })
    }

    public get config() {
        return this._config;
    }
}

class Config {
    prefix: string = 'test';
    autoreacts: AutoReact[] = [];
}