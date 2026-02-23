import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsI18nString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isI18nString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (typeof value !== 'object' || value === null) return false;

          const obj = value as Record<string, unknown>;
          return Object.values(obj).every((v) => typeof v === 'string');
        },
      },
    });
  };
}
