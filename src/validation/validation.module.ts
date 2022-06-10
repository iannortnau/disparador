import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  controllers: [ValidationController],
  providers: [ValidationService,PrismaService]
})
export class ValidationModule {}
