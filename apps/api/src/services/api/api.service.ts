import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  getHelloWorld(): Observable<Record<string, any>> {
    return new Observable<Record<string, any>>((subscriber) => {
      subscriber.next({data:'Hello World!'});
      subscriber.complete();
    });
  }
}
