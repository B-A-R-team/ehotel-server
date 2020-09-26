import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FileUploadDto } from './app.dto';

@ApiTags('通用接口')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: '文件上传', type: FileUploadDto })
  uploadFile(@UploadedFile() file) {
    return file;
  }
}
