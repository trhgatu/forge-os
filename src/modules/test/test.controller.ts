import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { createTestSchema } from '@modules/test/test.validator';
import { CreateTestInput } from '@modules/test/test.validator';
import { ZodValidationPipe } from '@shared/pipes/zod-validation.pipe';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  createcreate(
    @Body(new ZodValidationPipe(createTestSchema)) body: CreateTestInput,
  ) {
    return this.testService.create(body);
  }

  @Get()
  findAll() {
    return this.testService.getAll();
  }
}
