import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BikesModule } from './bikes/bikes.module';
import { ComponentsModule } from './components/components.module';
import { ComponentTypesModule } from './component-types/component-types.module';
import { RidesModule } from './rides/rides.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    BikesModule,
    ComponentsModule,
    ComponentTypesModule,
    RidesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
