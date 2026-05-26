import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RidesController],
  providers: [RidesService],
  imports: [PrismaModule],
  exports: [RidesService],
})
export class RidesModule {}
