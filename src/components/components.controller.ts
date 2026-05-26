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
import { ComponentsService } from './components.service';
import { UpdateComponentDto } from './dto/update-component.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('components')
@ApiBearerAuth()
@Controller('components')
export class ComponentsController {
  constructor(private componentsService: ComponentsService) {}

  @Get('wear/:bikeId')
  @ApiOperation({
    summary: 'Get wear status of components for a specific bike',
  })
  getWearStatus(
    @Param('bikeId') bikeId: string,
    @GetUser('id') userId: string,
  ) {
    return this.componentsService.getWearStatus(bikeId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
    @GetUser('id') userId: string,
  ) {
    return this.componentsService.update(updateComponentDto, id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.componentsService.remove(id, userId);
  }
}
