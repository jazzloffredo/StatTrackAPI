import { Injectable } from '@nestjs/common';
import { ConnectionPool, NVarChar } from 'mssql';
import { hash } from 'bcrypt';

import { NewUser } from './interfaces/new-user.interface';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class UserService {

    constructor(private configService: ConfigurationService) { }

    async checkExistingUsername(username: string): Promise<boolean> {
        try {
            const pool: ConnectionPool = new ConnectionPool(this.configService.dbConfig);
            await pool.connect();

            await pool.request()
                .input('Username', NVarChar, username)
                .execute('Users.CheckExistingUsername', (err, recordsets) => {
                    if (!err) {
                        return recordsets.rowsAffected[0] === 1 ? true : false;
                    }
                });

            await pool.close();
        } catch (err) {
            // tslint:disable-next-line: no-console
            console.log(err);
        }

        return false;
    }

    async checkExistingEmail(email: string): Promise<boolean> {
        try {
            const pool: ConnectionPool = new ConnectionPool(this.configService.dbConfig);
            await pool.connect();

            await pool.request()
                .input('Email', NVarChar, email)
                .execute('Users.CheckExistingEmail', (err, recordsets) => {
                    if (!err) {
                        return recordsets.rowsAffected[0] === 1 ? true : false;
                    }
                });

            await pool.close();
        } catch (err) {
            // tslint:disable-next-line: no-console
            console.log(err);
        }

        return false;
    }

    async registerUser(newUser: NewUser) {
        let hashedPassword: string;
        hash(newUser.password, 10, (err, encrypted) => {
            if (!err) {
                hashedPassword = encrypted;
            } else {
                hashedPassword = 'error';
            }
        });

        try {
            const pool: ConnectionPool = new ConnectionPool(this.configService.dbConfig);
            await pool.connect();

            await pool.request()
                .input('FirstName', NVarChar, newUser.firstName)
                .input('LastName', NVarChar, newUser.lastName)
                .input('Username', NVarChar, newUser.username)
                .input('Email', NVarChar, newUser.email)
                .input('PasswordHash', NVarChar, hashedPassword)
                .execute('Users.CreateUser');

            await pool.close();
        } catch (err) {
            // tslint:disable-next-line: no-console
            console.log(err);
        }
    }
}
