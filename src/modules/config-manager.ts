import { AutoReact } from '../models/autoreact';
import { readFile, writeFile } from 'fs';
import { singleton } from "tsyringe";
@singleton()
export class ConfigManager {

    private _config: Config = new Config();
    private _path: string = './src/config.json';

    constructor() {
        readFile(this._path, (err, data) => {
            if (err?.errno == -4058) {
                writeFile(this._path, JSON.stringify(this._config), (err) => {
                    if (err) console.log('error', err);
                });
            } else {
                this._config = JSON.parse(data.toString());
            }
        })
    }

    public get config(): Config {
        return this._config;
    }

    public saveConfig(): void {
        writeFile(this._path, JSON.stringify(this._config), (err) => {
            if (err) console.log('error', err);
        });
    }
}

class Config {
    prefix: string = '!';
    autoreacts: AutoReact[] = [];
}