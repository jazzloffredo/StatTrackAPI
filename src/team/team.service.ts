import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { ConfigurationService } from '../configuration/configuration.service';
import { Team } from './interfaces/team.interface';
import { TeamSeason } from './interfaces/team-season.interface';
import { UserFavoriteTeam } from './interfaces/user-favorite-team.interface';

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

    async retrieveAllTeamSeasons(id: string): Promise<TeamSeason[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const teamSeasons: TeamSeason[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('TeamId', id)
                .execute('Stats.ListTeamSeasons');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curTeamSeason: TeamSeason = {
                    teamName: curRow[0],
                    year: curRow[1],
                    league: curRow[2],
                    wins: curRow[3],
                    losses: curRow[4],
                    winLossRatio: curRow[5],
                    wsWinner: curRow[6],
                    runsScored: curRow[7],
                    runsAgainst: curRow[8],
                    hittingStats: curRow[9],
                    hitsAllowed: curRow[10],
                    errors: curRow[11],
                    homeAttendance: curRow[12],
                };
                teamSeasons.push(curTeamSeason);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }
        return teamSeasons;
    }

    async retrieveFavoriteTeamsForUser(username: string): Promise<string[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const teamIDs: string[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', username)
                .execute('Users.RetrieveTeamFav');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                teamIDs.push(curRow[0]);
            }
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return teamIDs;
    }

    async retrieveFavoriteTeamNames(username: string): Promise<string[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const favoriteNames: string[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', username)
                .execute('Users.RetrieveFavTeamNames');

            const resultsAsTable = result.recordset.toTable();

            for (const row of resultsAsTable.rows) {
                favoriteNames.push(row[0]);
            }
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return favoriteNames;

    }

    async addFavoriteTeamForUser(userFavTeam: UserFavoriteTeam): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let favoriteAdded = false;

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', userFavTeam.username)
                .input('TeamId', userFavTeam.teamID)
                .execute('Users.CreateTeamFav');

            favoriteAdded = result.rowsAffected[0] === 1 ? true : false;
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return favoriteAdded;
    }

    async deleteFavoriteTeamForUser(userFavTeam: UserFavoriteTeam): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let favoriteDeleted = false;

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', userFavTeam.username)
                .input('TeamId', userFavTeam.teamID)
                .execute('Users.DelTeamFav');

            favoriteDeleted = result.rowsAffected[0] === 1 ? true : false;
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return favoriteDeleted;
    }
}
