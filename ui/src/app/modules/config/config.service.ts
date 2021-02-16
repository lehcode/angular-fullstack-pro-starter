import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import config from '~/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static config = config;
  private static appEnv = 'dev';

  constructor() {
    ConfigService.appEnv = environment.production ? 'prod' : 'dev';
  }

  /**
   * Convert string to object path and return property value
   */
  private static getSetting<T = any>(path: string): T | undefined {
    return path.split('.')
      .reduce((o, x) => o[x] as any, ConfigService.config[ConfigService.appEnv]);
  }

  getEnv() {
    return ConfigService.appEnv;
  }

  /**
   * Get config setting value with optional default fallback
   */
  get<T = any>(propertyPath: string, defaultValue?: T): T | undefined {
    return ConfigService.getSetting(propertyPath) !== undefined
      ? ConfigService.getSetting(propertyPath)
      : defaultValue;
  }
}
