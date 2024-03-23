import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';
import { CommonModule } from './modules/auth/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule,
    UsersModule,
    AuthModule,
    NotesModule,
    CommonModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: ClassSerializerInterceptor,
  //   },
  // ],
})
export class AppModule {}
