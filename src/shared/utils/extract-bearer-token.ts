import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export function extractBearerToken(req: Request): string {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Invalid or missing Authorization header');
  }

  return authHeader.split(' ')[1];
}
