import { Injectable } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { ConfigurationService } from './configuration/configuration.service';

@Injectable()
export class AppService {
  constructor(private configService: ConfigurationService) { }

  async getHello(): Promise<string> {
    try {
      const pool: ConnectionPool = new ConnectionPool(this.configService.dbConfig);
      await pool.connect();
      await pool.close();

      return 'connected to mssql';
    } catch (err) {
      return 'there was an error';
    }
  }
}
