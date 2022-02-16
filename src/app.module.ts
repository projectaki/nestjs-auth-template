import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { config } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { ExceptionsModule } from './exceptions/exceptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
    ExceptionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
