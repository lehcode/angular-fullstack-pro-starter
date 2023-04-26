import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  helloWorld(): Observable<string> {
    return new Observable<string>((subscriber) => {
      subscriber.next('Hello World!');
      subscriber.complete();
    });
  }
}
