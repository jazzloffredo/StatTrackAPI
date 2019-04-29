import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdatePassFailedException extends HttpException {
  constructor() {
    super('Update failed.', HttpStatus.BAD_REQUEST);
  }
}
