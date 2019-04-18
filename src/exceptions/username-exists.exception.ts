import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameExistsException extends HttpException {
  constructor() {
    super('Username already exists.', HttpStatus.CONFLICT);
  }
}
