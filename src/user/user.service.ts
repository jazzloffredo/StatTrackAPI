import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool, NVarChar } from 'mssql';
import { hash, compare } from 'bcrypt';

import { NewUser } from './interfaces/new-user.interface';
import { LoginUser } from './interfaces/login-user.interface';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class UserService {
    pool: ConnectionPool = new ConnectionPool(this.configService.dbConfig);

    constructor(private configService: ConfigurationService) { }

    async checkUsernameExists(username: string): Promise<boolean> {
        try {
            let usernameExists = false;
            await this.pool.connect();

            await this.pool.request()
                .input('Username', NVarChar, username)
                .execute('Users.CheckUsernameExists')
                .then((response) => {
                    usernameExists = response.rowsAffected[0] === 1 ? true : false;
                }, (error) => {
                    Logger.log(error);
                });

            await this.pool.close();

            return usernameExists;
        } catch (err) {
            Logger.log(err);
        }

        return false;
    }

    async checkEmailExists(email: string): Promise<boolean> {
        try {
            let emailExists = false;
            await this.pool.connect();

            await this.pool.request()
                .input('Email', NVarChar, email)
                .execute('Users.CheckEmailExists')
                .then((response) => {
                    emailExists = response.rowsAffected[0] === 1 ? true : false;
                }, (error) => {
                    Logger.log(error);
                });

            await this.pool.close();

            return emailExists;
        } catch (err) {
            Logger.log(err);
        }

        return false;
    }

    async registerUser(newUser: NewUser) {
        let hashedPassword: string;
        await hash(newUser.password, 10)
            .then((encrypted) => {
                hashedPassword = encrypted;
            });

        try {
            await this.pool.connect();

            await this.pool.request()
                .input('FirstName', NVarChar, newUser.firstName)
                .input('LastName', NVarChar, newUser.lastName)
                .input('Username', NVarChar, newUser.username)
                .input('Email', NVarChar, newUser.email)
                .input('PasswordHash', NVarChar, hashedPassword)
                .execute('Users.CreateUser');

            await this.pool.close();
        } catch (err) {
            Logger.log(err);
        }
    }

    async attemptLogin(loginUser: LoginUser): Promise<boolean> {
        try {
            let passwordMatchesHash = false;
            await this.pool.connect();

            let retrievedPasswordHash: string;
            await this.pool.request()
                .input('Username', NVarChar, loginUser.username)
                .output('PasswordHash', NVarChar)
                .execute('Users.RetrievePasswordHash')
                .then((response) => {
                    retrievedPasswordHash = response.output.PasswordHash;
                }, (error) => {
                    Logger.log(error);
                });

            await compare(loginUser.password, retrievedPasswordHash)
                    .then((match) => {
                        passwordMatchesHash = match;
                    }, (err) => {
                        Logger.log(err);
                    });

            await this.pool.close();

            return passwordMatchesHash;
        } catch (err) {
            Logger.log(err);
        }

        return false;
    }
}
