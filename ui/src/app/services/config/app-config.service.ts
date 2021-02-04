import { Injectable } from '@angular/core';
import config from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  getValue(key: string): any {
    return key.split('.')
      .reduce((obj: any, idx) => obj[idx], config);
  }
}
