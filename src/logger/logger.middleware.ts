import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `[Request] url: ${req.url}, params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}`
    );
    next();
  }
}
