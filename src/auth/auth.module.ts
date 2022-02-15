import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { PermissionsGuard } from './guards/permissions.guard';
import { PolicyService } from './policy.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), forwardRef(() => UsersModule)],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    AuthService,
    PolicyService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
