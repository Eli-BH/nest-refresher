import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  log(message: string, context?: string) {
    const entry = `${context ? context + ' ' : ''}${message}`;
    super.log(`MyLoggerService: ${entry}\t${message}`);
  }
  error(message: string, trace: string, stackOrContext?: string) {
    super.error(`MyLoggerService:${stackOrContext}\t${message}`, trace);
  }
  warn(message: string) {
    super.warn(`MyLoggerService: ${message}`);
  }
  debug(message: string) {
    super.debug(`MyLoggerService: ${message}`);
  }
  verbose(message: string) {
    super.verbose(`MyLoggerService: ${message}`);
  }
}
