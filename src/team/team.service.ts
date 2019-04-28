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
                    year: curRow[0],
                    league: curRow[1],
                    wins: curRow[2],
                    losses: curRow[3],
                    winLossRatio: curRow[4],
                    wsWinner: curRow[5],
                    runsScored: curRow[6],
                    runsAgainst: curRow[7],
                    hittingStats: curRow[8],
                    hitsAllowed: curRow[9],
                    errors: curRow[10],
                    homeAttendance: curRow[11],
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

    async retrieveFavorteTimesForUser(username: string): Promise<string[]> {

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
