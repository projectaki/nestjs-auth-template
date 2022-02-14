import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService, LoggerMiddleware],
  exports: [LoggerService, LoggerMiddleware],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
