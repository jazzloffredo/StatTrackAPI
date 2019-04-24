import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { ConfigurationService } from 'src/configuration/configuration.service';
import { Team } from './interfaces/team.interface';

@Injectable()
export class TeamService {

    constructor(private configService: ConfigurationService) { }

    async retrieveAllTeams(): Promise<Team[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let teams: Team[];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.ListTeams');

            const resultAsTable = result.recordset.toTable();

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return teams;
    }
}
