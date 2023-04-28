export class ConfigService {
  private static _instance: ConfigService;
  constructor() {}

  static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new ConfigService();
    return this._instance;
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(process.env[key]);
  }
}
