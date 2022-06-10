import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationModule } from './validation/validation.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ValidationModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
