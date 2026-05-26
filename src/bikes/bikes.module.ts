import { Module } from '@nestjs/common';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RidesModule } from '../rides/rides.module';
import { ComponentsModule } from '../components/components.module';

@Module({
  controllers: [BikesController],
  providers: [BikesService],
  imports: [PrismaModule, RidesModule, ComponentsModule],
})
export class BikesModule {}
