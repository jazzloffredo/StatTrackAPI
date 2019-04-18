import { Injectable } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { dbConfig } from './config';

@Injectable()
export class AppService {

  async getHello(): Promise<string> {
    try {
      const pool: ConnectionPool = new ConnectionPool(dbConfig);
      await pool.connect();
      await pool.close();

      return 'connected to mssql';
    } catch (err) {
      return 'there was an error';
    }
  }
}
