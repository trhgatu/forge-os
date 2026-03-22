import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class GlobalZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const schema = metadata.metatype?.['zodSchema'] as ZodSchema | undefined;

    if (metadata.type !== 'body' || !schema) {
      return value;
    }

    try {
      return schema.parse(value);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Dữ liệu đéo khớp rồi ông giáo ạ!',
          errorCode: 'VALIDATION_ERROR',
          errors: error.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
          })),
        });
      }
      throw error;
    }
  }
}
