import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import config from '~/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static config = config;

  constructor() {}

  /**
   * Convert string to object path and return property value
   */
  private static getSetting<T = any>(path: string): T | undefined {
    const appEnv: any = environment.production ? 'prod' : 'dev';
    return path.split('.').reduce((o, x) => o[x] as any, ConfigService.config[appEnv]);
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
