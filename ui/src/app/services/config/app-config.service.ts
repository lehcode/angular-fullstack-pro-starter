import { Injectable } from '@angular/core';
import config from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  getValue(key: string): any {
    return key.split('.').reduce((o: any, i)=>o[i], config);
  }
}
