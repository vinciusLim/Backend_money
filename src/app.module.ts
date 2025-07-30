import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transaction/transaction.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    TransactionModule,
    PrismaModule,
    // Outros módulos que já existiam
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
