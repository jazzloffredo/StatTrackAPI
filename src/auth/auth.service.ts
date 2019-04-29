import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool, NVarChar } from 'mssql';
import { hash, compare } from 'bcrypt';

import { NewUser } from './interfaces/new-user.interface';
import { LoginUser } from './interfaces/login-user.interface';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class AuthService {

    constructor(private configService: ConfigurationService) { }

    async checkUsernameExists(username: string): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let usernameExists = false;

        try {
            await pool.connect();

            await pool.request()
                .input('Username', NVarChar, username)
                .execute('Users.CheckUsernameExists')
                .then((response) => {
                    usernameExists = response.rowsAffected[0] === 1 ? true : false;
                }, (error) => {
                    Logger.log(error);
                });
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return usernameExists;
    }

    async checkEmailExists(email: string): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let emailExists = false;

        try {
            await pool.connect();

            await pool.request()
                .input('Email', NVarChar, email)
                .execute('Users.CheckEmailExists')
                .then((response) => {
                    emailExists = response.rowsAffected[0] === 1 ? true : false;
                }, (error) => {
                    Logger.log(error);
                });
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return emailExists;
    }

    async registerUser(newUser: NewUser) {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const hashedPassword = await hash(newUser.password, 10);

        try {
            await pool.connect();

            await pool.request()
                .input('FirstName', NVarChar, newUser.firstName)
                .input('LastName', NVarChar, newUser.lastName)
                .input('Username', NVarChar, newUser.username)
                .input('Email', NVarChar, newUser.email)
                .input('PasswordHash', NVarChar, hashedPassword)
                .execute('Users.CreateUser');

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }
    }

    async attemptLogin(loginUser: LoginUser): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let passwordMatchesHash = false;

        try {
            await pool.connect();

            let retrievedPasswordHash: string;
            await pool.request()
                .input('Username', NVarChar, loginUser.username)
                .output('PasswordHash', NVarChar)
                .execute('Users.RetrievePasswordHash')
                .then((response) => {
                    retrievedPasswordHash = response.output.PasswordHash;
                }, (error) => {
                    Logger.log(error);
                });

            passwordMatchesHash = await compare(loginUser.password, retrievedPasswordHash);
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        if (passwordMatchesHash) {
            this.updateLastLogin(loginUser.username);
        }

        return passwordMatchesHash;
    }

    async updateLastLogin(username: string) {

        const pool = new ConnectionPool(this.configService.dbConfig);

        try {
            await pool.connect();

            const response = await pool.request()
                                    .input('Username', username)
                                    .execute('Users.UpdateLastLogin');

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }
    }

    async updatePassword(loginUser: LoginUser): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let updateSuccess = false;

        const hashedPassword = await hash(loginUser.password, 10);

        try {
            await pool.connect();

            const response = await pool.request()
                                    .input('Username', NVarChar, loginUser.username)
                                    .input('PasswordHash', NVarChar, hashedPassword)
                                    .execute('Users.UpdatePassword');

            if (response.rowsAffected[0] === 1) {
                updateSuccess = true;
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return updateSuccess;
    }
}
