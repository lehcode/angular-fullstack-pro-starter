import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  constructor(context: string) {
    super(context);
  }

  setContext(context: string) {
    this.context = context;
  }
}
