import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RidesService } from './rides.service';
import { UpdateRideDto } from './dto/update-ride.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@ApiTags('rides')
@ApiBearerAuth()
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRideDto: UpdateRideDto,
    @GetUser('id') userId: string,
  ) {
    return this.ridesService.update(id, updateRideDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.ridesService.remove(id, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridesService.findOne(id);
  }
}
