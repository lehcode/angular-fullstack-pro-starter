import {Controller, Get, Post} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';

@Controller('api')
export class ApiController {
  private hello: string;

  constructor(private readonly apiService: ApiService) {}

  @Get('hello')
  helloWorld(): Observable<Record<string, any>> {
    return this.apiService.getHelloWorld();
  }

  @Post('/hello')
  setHello(str: string): void {
    this.hello = 'World Hello!';
  }
}
