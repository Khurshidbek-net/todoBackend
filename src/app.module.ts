import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), TaskModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
