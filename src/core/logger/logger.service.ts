import { Injectable } from '@nestjs/common';
import winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
      ],
    });
    this.log('Logger initialized');
  }

  public log(messages: string, ...args: any) {
    this.logger.info(messages, ...args);
  }

  public error(messages: string, ...args: any) {
    this.logger.error(messages, ...args);
  }

  public warn(messages: string, ...args: any) {
    this.logger.warn(messages, ...args);
  }
}
