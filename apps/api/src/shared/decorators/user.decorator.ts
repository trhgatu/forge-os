import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user) return null;
  if (!data) return user;

  const value = user[data];
  if (value && typeof value === 'object') {
    if ('value' in value) {
      return value.value;
    }
    if (typeof value.toString === 'function' && value.toString() !== '[object Object]') {
      return value.toString();
    }
  }
  return value;
});
