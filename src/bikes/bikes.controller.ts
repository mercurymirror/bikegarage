import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { RidesService } from '../rides/rides.service';
import { CreateRideDto } from '../rides/dto/create-ride.dto';
import { CreateComponentDto } from '../components/dto/create-component.dto';
import { ComponentsService } from '../components/components.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('bikes')
@ApiBearerAuth()
@Controller('bikes')
export class BikesController {
  constructor(
    private readonly bikesService: BikesService,
    private readonly ridesService: RidesService,
    private readonly componentsService: ComponentsService,
  ) {}

  @Get(':bikeId/rides')
  getRides(@Param('bikeId') bikeId: string) {
    return this.ridesService.findAll(bikeId);
  }

  @Post(':bikeId/rides')
  createRide(
    @Body() createRideDto: CreateRideDto,
    @Param('bikeId') bikeId: string,
  ) {
    return this.ridesService.create(createRideDto, bikeId);
  }

  @Get(':bikeId/components')
  getComponents(@Param('bikeId') bikeId: string) {
    return this.componentsService.findAll(bikeId);
  }

  @Post(':bikeId/components')
  createComponent(
    @Body() createComponentDto: CreateComponentDto,
    @Param('bikeId') bikeId: string,
  ) {
    return this.componentsService.create(createComponentDto, bikeId);
  }

  @Post()
  create(@Body() createBikeDto: CreateBikeDto, @GetUser('id') userId: string) {
    return this.bikesService.create(createBikeDto, userId);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.bikesService.findAll(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBikeDto: UpdateBikeDto,
    @GetUser('id') userId: string,
  ) {
    return this.bikesService.update(id, updateBikeDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.bikesService.remove(id, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.bikesService.findOne(id, userId);
  }
}
