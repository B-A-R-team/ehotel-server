import { Controller } from '@nestjs/common';
import { ActiveService } from './active.service';

@Controller('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}
}
