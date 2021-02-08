import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '~/app/modules/config/config.service';
import { isNull } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly urlHost: string | undefined;
  private readonly urlPort: string | undefined;
  private uri: string | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService
  ) {
    this.urlHost = this.config.get<string>('api.host');
    this.urlPort = this.config.get<string>('api.port');
  }

  decodeVIN$(code: string, year: number | null): Observable<Record<string, any>> {
    this.uri = `${this.config.get<string>('api.endpoints.decodeVin')}${code}`;
    if (!isNull(year) && year > 1979) {
      this.uri += `&modelyear=${year}`;
    }
    return this.http.get(`${this.urlHost}:${this.urlPort}${this.uri}&lc=ru-RU`);
  }
}
