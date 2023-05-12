import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import config from '@root/config';

/**
 * This is the AppConfigService class, an injectable service in the NestJS framework. It is used to manage the
 * configuration of the application. The service makes use of the ConfigService from the NestJS Config module
 * to retrieve the configuration values. The configuration values are initialized by calling the config function
 * defined in the root config file. The AppConfigService class provides getter and setter methods for accessing
 * and updating the configuration values.
 */

@Injectable()
export class AppConfigService {
  private readonly config: Record<string, any> = {};

  constructor(
    private readonly service: ConfigService
  ) {
    this.config = config();
  }

  /**
   * App config getter
   */
  get<T>(path: string): T {
    return path.split('.')
      .reduce((object, path) => {
        return (object || {})[path];
      }, this.config) as T;
  }

  /**
   * App config runtime value setter
   */
  set<T>(path: string, value: T): void {
    path.split('.')
      .reduce((config: Record<string, any>, key: string) => {
        if (config[key] instanceof Object) {
          return config[key];
        }

        if (!config.key) {
          return Object.assign(config, { [key]: value });
        }
      }, this.config);
  }
  
  get port(): number {
    return this.config.api.port;
  }

  get locales(): string[] {
    return this.config.locale.locales;
  }
}
