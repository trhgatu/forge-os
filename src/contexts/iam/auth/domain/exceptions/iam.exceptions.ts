import { BaseDomainException } from '@shared/exceptions/base-domain.exception';
import { ErrorCode } from '@shared/constants/error-codes';
import { HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends BaseDomainException {
  constructor(metadata?: Record<string, any>) {
    super(
      'Invalid credentials',
      ErrorCode.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
      metadata,
    );
  }
}

export class RoleNotFoundException extends BaseDomainException {
  constructor(metadata?: Record<string, any>) {
    super(
      'Role not found',
      ErrorCode.NOT_FOUND,
      HttpStatus.NOT_FOUND,
      metadata,
    );
  }
}

export class PermissionNotFoundException extends BaseDomainException {
  constructor(metadata?: Record<string, any>) {
    super(
      'Permission not found',
      ErrorCode.NOT_FOUND,
      HttpStatus.NOT_FOUND,
      metadata,
    );
  }
}

export class EmailAlreadyInUseException extends BaseDomainException {
  constructor(metadata?: Record<string, any>) {
    super(
      'Email is already in use',
      ErrorCode.CONFLICT,
      HttpStatus.CONFLICT,
      metadata,
    );
  }
}
