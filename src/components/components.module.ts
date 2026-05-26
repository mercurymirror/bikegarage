import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
  imports: [PrismaModule],
})
export class ComponentsModule {}
