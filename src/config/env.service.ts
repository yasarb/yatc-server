import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class EnvService {
  private readonly env: { [key: string]: string };

  constructor(filePath: string) {
    this.env = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.env[key];
  }
}
