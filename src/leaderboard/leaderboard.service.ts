import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { ConfigurationService } from '../configuration/configuration.service';
import { LeaderboardPlayer } from './interfaces/leaderboard-player.interface';

@Injectable()
export class LeaderboardService {

    constructor(private configService: ConfigurationService) { }

    async retrieveSmallestPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsSmallestPlayers');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveLargestPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsLargestPlayers');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveShortestPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsShortestPlayers');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveTallestPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsTallestPlayers');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveHBPPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsHBP');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveWildPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsBadPitcher');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveStrikeoutsPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsMostStrikeOuts');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveBasesPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsMostBasesStolen');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }

    async retrieveHomerunsPlayers(): Promise<LeaderboardPlayer[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: LeaderboardPlayer[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.FunFactsMostHomeRuns');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: LeaderboardPlayer = {
                    playerID: curRow[0],
                    rank: curRow[1],
                    name: curRow[2],
                    stat: curRow[3],
                };
                players.push(curPlayer);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return players;
    }
}
