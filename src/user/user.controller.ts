import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserService } from './user.service';
import { UsernameExistsException } from '../exceptions/username-exists.exception';
import { EmailExistsException } from '../exceptions/email-exists.exception';
import { LoginFailedException } from '../exceptions/login-failed.exception';

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

    @Post('attemptLogin')
    @UsePipes(new ValidationPipe())
    async attemptLogin(@Body() loginUserDTO: LoginUserDTO) {
        const validUsername = await this.userService.checkUsernameExists(loginUserDTO.username);

        if (!validUsername) {
            throw new LoginFailedException();
        }

        const loginSuccess = await this.userService.attemptLogin(loginUserDTO);

        if (!loginSuccess) {
            throw new LoginFailedException();
        }
        return;
    }
}
