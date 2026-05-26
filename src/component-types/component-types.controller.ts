import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateComponentTypeDto } from './dto/create-componentType.dto';
import { ComponentTypesService } from './component-types.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('component-types')
@ApiBearerAuth()
@Controller('component-types')
export class ComponentTypesController {
  constructor(private componentTypesService: ComponentTypesService) {}

  @Post()
  create(@Body() createComponentTypeDto: CreateComponentTypeDto) {
    return this.componentTypesService.create(createComponentTypeDto);
  }

  @Get()
  findAll() {
    return this.componentTypesService.findAll();
  }
}
