import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/modules/auth/auth-jwt.guard';

// Binding AuthGuard for all routes that require authentication
@Module({
  imports: [JwtModule, ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class CommonModule {}

























