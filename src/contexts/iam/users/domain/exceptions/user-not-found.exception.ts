import { BaseDomainException } from '@shared/exceptions/base-domain.exception';
import { ErrorCode } from '@shared/constants/error-codes';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends BaseDomainException {
    constructor(metadata?: Record<string, any>) {
        super(
            'User not found',
            ErrorCode.USER_NOT_FOUND,
            HttpStatus.NOT_FOUND,
            metadata,
        );
    }
}
