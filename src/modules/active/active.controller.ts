import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActiveService } from './active.service';
import { CreateAndUpdateActiveDto } from './active.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('活动接口')
@Controller('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @Get('/list')
  @ApiOperation({ summary: '获取全部活动' })
  async getAll() {
    return this.activeService.findAll();
  }

  @Get('/list/:id')
  @ApiOperation({ summary: '根据id获取活动' })
  async getById(@Param('id') id: number) {
    return this.activeService.findById(id);
  }

  @Get('/getByHotel')
  @ApiOperation({ summary: '根据酒店id获取活动' })
  async getByHotelId(@Query('hotelId') hotelId: number) {
    return this.activeService.findByHotelId(hotelId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建活动' })
  async create(@Body() createActiveDto: CreateAndUpdateActiveDto) {
    return this.activeService.create(createActiveDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新活动' })
  async update(
    @Param('id') id: number,
    @Body() updateActiveDto: CreateAndUpdateActiveDto,
  ) {
    return this.activeService.update(id, updateActiveDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除活动' })
  async delete(@Param('id') id: number) {
    return this.activeService.delete(id);
  }
}
