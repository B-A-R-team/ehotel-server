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
import { RecordService } from './record.service';
import { CreateRecordDto } from './record.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('订单接口')
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('/getByHotelId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取某个酒店所有订单' })
  async getByHotelId(@Query('hotelId') hotelId: number) {
    return await this.recordService.findByHotelId(hotelId);
  }

  @Get('/getByRoomId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取该房间所有订单' })
  async getByRoomId(@Query('roomId') roomId: number) {
    return await this.recordService.findByRoomId(roomId);
  }

  @Get('/getByUserId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取某个用户全部订单' })
  async getByUserId(@Query('userId') userId: number) {
    return await this.recordService.findByUserId(userId);
  }

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建订单' })
  async create(@Body() createRecordDto: CreateRecordDto) {
    return await this.recordService.create(createRecordDto);
  }

  @Put('/closeRecord/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '设置订单失效' })
  async closeRecord(@Param('id') id: number) {
    return await this.recordService.changeRecord(id, true);
  }

  @Put('/openRecord/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '设置订单有效' })
  async openRecord(@Param('id') id: number) {
    return await this.recordService.changeRecord(id, false);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除订单' })
  async delete(@Param('id') id: number) {
    return await this.recordService.delete(id);
  }
}
