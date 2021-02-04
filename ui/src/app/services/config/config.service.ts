import { Injectable } from '@angular/core';
import * as config from '../config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  get apiBaseUrl(): string {
    return config.api.baseUrl;
  }
}
