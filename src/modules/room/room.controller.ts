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
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAndUpdateRoomDto, CreateAndUpdateTypeDto } from './room.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('房间接口')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/list')
  @ApiOperation({ summary: '获取所有房间' })
  async getAllRoom() {
    return await this.roomService.findAll();
  }

  @Get('/type/list')
  @ApiOperation({ summary: '获取所有房间类型' })
  async getAllType() {
    return await this.roomService.findAllType();
  }

  @Get('/type/list/:id')
  @ApiOperation({ summary: '根据TypeID获取房间类型' })
  async getTypeById(@Param('id') id: number) {
    return await this.roomService.findTypeById(id);
  }

  @Get('/list/:id')
  @ApiOperation({ summary: '根据ID获取房间' })
  async getRoomById(@Param('id') id: number) {
    return await this.roomService.findRoomById(id);
  }

  @Get('/getByType')
  @ApiOperation({ summary: '根据类型获取房间' })
  async getRoomByType(@Query('typeId') typeId: number) {
    return await this.roomService.findRoomByType(typeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/type/create')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建房间类型' })
  async createType(@Body() createTypeDto: CreateAndUpdateTypeDto) {
    return await this.roomService.createType(createTypeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建房间' })
  async createRoom(@Body() createRoomDto: CreateAndUpdateRoomDto) {
    return await this.roomService.createRoom(createRoomDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/type/update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '修改房间类型名' })
  async updateType(
    @Param('id') id: number,
    @Body() updateTypeDto: CreateAndUpdateTypeDto,
  ) {
    return await this.roomService.updateType(id, updateTypeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '修改房间信息' })
  async updateRoom(
    @Param('id') id: number,
    @Body() updateRoomDto: CreateAndUpdateRoomDto,
  ) {
    return await this.roomService.updateRoom(id, updateRoomDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/type/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除房间类型' })
  async deleteType(@Param('id') id: number) {
    return await this.roomService.deleteType(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除房间信息' })
  async deleteRoom(@Param('id') id: number) {
    return await this.roomService.deleteRoom(id);
  }
}
