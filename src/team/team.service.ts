import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { ConfigurationService } from '../configuration/configuration.service';
import { Team } from './interfaces/team.interface';

@Injectable()
export class TeamService {

    constructor(private configService: ConfigurationService) { }

    async retrieveAllTeams(): Promise<Team[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const teams: Team[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.ListTeams');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curTeam: Team = {
                    teamID: curRow[0],
                    teamName: curRow[1],
                    isActive: curRow[2],
                    totalGames: curRow[3],
                    totalWins: curRow[4],
                    totalLosses: curRow[5],
                    winLossRatio: curRow[6],
                    leagueWins: curRow[7],
                    worldSeriesWins: curRow[8],
                };
                teams.push(curTeam);
            }

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
