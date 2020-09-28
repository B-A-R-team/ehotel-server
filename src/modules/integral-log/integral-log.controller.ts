import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IntegralLogService } from './integral-log.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateIntegralLogDto } from './integral-log.dto';

@ApiTags('积分接口')
@ApiBearerAuth()
@Controller('integralLog')
export class IntegralLogController {
  constructor(private readonly integralLogService: IntegralLogService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  @ApiOperation({ summary: '获取所有积分记录' })
  async getAll() {
    return this.integralLogService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/list/:id')
  @ApiOperation({ summary: '根据ID获取积分记录' })
  async getById(@Param('id') id: number) {
    return this.integralLogService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getByUser')
  @ApiOperation({ summary: '获取某用户的积分记录' })
  async getByUserId(@Query('userId') userId: number) {
    return this.integralLogService.findByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @ApiOperation({ summary: '创建积分记录' })
  async create(@Body() createIntegralLog: CreateIntegralLogDto) {
    return this.integralLogService.create(createIntegralLog);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  @ApiOperation({ summary: '删除积分记录' })
  async delete(@Param('id') id: number) {
    return this.integralLogService.delete(id);
  }
}
