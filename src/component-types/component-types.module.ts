import { Module } from '@nestjs/common';
import { ComponentTypesController } from './component-types.controller';
import { ComponentTypesService } from './component-types.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ComponentTypesController],
  providers: [ComponentTypesService],
  imports: [PrismaModule],
})
export class ComponentTypesModule {}
