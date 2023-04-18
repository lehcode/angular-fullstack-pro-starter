import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import config from '@root/config';

@Injectable()
export class AppConfigService {
  private readonly config: Record<string, any> = {};

  constructor(
    private readonly service: ConfigService
  ) {
    this.config = config();
  }

  get<T>(path: string): T {
    return path.split('.')
      .reduce((object, path) => {
        return (object || {})[path];
      }, this.config) as T;
  }

  set<T>(path: string, value: T): void {
    path.split('.')
      .reduce((config: Record<string, any>, key) => {
        if (config[key] instanceof Object) {
          return config[key];
        }

        if (!config.key) {
          return Object.assign(config, { [key]: value });
        }
      }, this.config);
  }

  get ssl(): boolean {
    return this.config.api.ssl === 'yes' || this.config.api.ssl === 'true';
  }
}
