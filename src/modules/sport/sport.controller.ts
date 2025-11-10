import { Controller, Get } from '@nestjs/common';

@Controller('sport')
export class SportController {
  @Get()
  getHello(): string {
    return 'Sport works!';
  }
}
