import { Controller, Post, Body, UsePipes, ValidationPipe, Logger } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UsernameExistsException } from '../exceptions/username-exists.exception';
import { EmailExistsException } from '../exceptions/email-exists.exception';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('registerUser')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() createUserDTO: CreateUserDTO) {

        const usernameExists = await this.userService.checkUsernameExists(createUserDTO.username);
        const emailExists = await this.userService.checkEmailExists(createUserDTO.email);

        if (usernameExists) {
            throw new UsernameExistsException();
        }

        if (emailExists) {
            throw new EmailExistsException();
        }

        await this.userService.registerUser(createUserDTO);
        return;
    }
}
