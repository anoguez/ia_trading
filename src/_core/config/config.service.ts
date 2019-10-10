import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  getAsString(name: string): string {
    if (typeof process.env[name] === "undefined") {
      throw new Error(`Env variable with name "${name}" is undefined.`);
    }
    return process.env[name];
  }

  getAsInt(name: string): number {
    const val = parseInt(this.getAsString(name), 10);
    if (isNaN(val)) {
      throw new Error(`Env variable with name "${name}" is not a valid number.`);
    }
    return val;
  }

  getAsFloat(name: string): number {
    const val = parseFloat(this.getAsString(name));
    if (isNaN(val)) {
      throw new Error(`Env variable with name "${name}" is not a valid number.`);
    }
    return val;
  }

  getAsBoolean(name: string): boolean {
    const stringVal = this.getAsString(name);
    if (stringVal === "1" || stringVal === "true") return true;
    if (stringVal === "0" || stringVal === "false") return false;
    throw new Error(`Env variable with name "${name}" is not a valid boolean.`);
  }
}
