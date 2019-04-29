import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { ConfigurationService } from '../configuration/configuration.service';
import { Player } from './interfaces/player.interface';
import { UserFavoritePlayer } from './interfaces/user-favorite-player.interface';
import { PlayerBattingSeason } from './interfaces/player-batting-season.interface';
import { PlayerFieldingSeason } from './interfaces/player-fielding-season.inteface';
import { PlayerPitchingSeason } from './interfaces/player-pitching-season.interface';

@Injectable()
export class PlayerService {
    constructor(private configService: ConfigurationService) { }

    async retrieveAllPlayersGivenChar(lastNameChar: string): Promise<Player[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: Player[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('LastNameChar', lastNameChar)
                .execute('Stats.ListPlayersGivenChar');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curPlayer: Player = {
                    playerID: curRow[0],
                    firstName: curRow[1],
                    lastName: curRow[2],
                    height: curRow[9],
                    totalGames: curRow[3],
                    totalHits: curRow[4],
                    totalRuns: curRow[5],
                    totalRBIs: curRow[7],
                    totalHomeruns: curRow[6],
                    totalHomerunsRank: curRow[8],
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

    async retrievePlayerBattingSeasons(playerID: string): Promise<PlayerBattingSeason[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const seasons: PlayerBattingSeason[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('PlayerId', playerID)
                .execute('Stats.ListPlayerSeasonsB');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curSeason: PlayerBattingSeason = {
                    year: curRow[0],
                    teamName: curRow[1],
                    games: curRow[2],
                    atBats: curRow[3],
                    hits: curRow[4],
                    battingAverage: curRow[5],
                    RBIs: curRow[6],
                    baseOnBalls: curRow[7],
                    hittingStats: curRow[8],
                    strikeouts: curRow[9],
                    runs: curRow[10],
                    stolenBases: curRow[11],
                    hitByPitch: curRow[12],
                    sacFly: curRow[13],
                };
                seasons.push(curSeason);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return seasons;
    }

    async retrievePlayerFieldingSeasons(playerID: string): Promise<PlayerFieldingSeason[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const seasons: PlayerFieldingSeason[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('PlayerId', playerID)
                .execute('Stats.ListPlayerSeasonsF');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curSeason: PlayerFieldingSeason = {
                    year: curRow[0],
                    teamName: curRow[1],
                    position: curRow[2],
                    games: curRow[3],
                    gamesStarted: curRow[4],
                    putouts: curRow[5],
                    assists: curRow[6],
                    doublePlays: curRow[7],
                    errors: curRow[8],
                };
                seasons.push(curSeason);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return seasons;
    }

    async retrievePlayerPitchingSeasons(playerID: string): Promise<PlayerPitchingSeason[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const seasons: PlayerPitchingSeason[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('PlayerId', playerID)
                .execute('Stats.ListPlayerSeasonsP');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                const curSeason: PlayerPitchingSeason = {
                    year: curRow[0],
                    teamName: curRow[1],
                    wins: curRow[2],
                    losses: curRow[3],
                    games: curRow[4],
                    completeGames: curRow[5],
                    shutouts: curRow[6],
                    saves: curRow[7],
                    hitsAllowed: curRow[8],
                    homerunsAllowed: curRow[9],
                    earnedRuns: curRow[10],
                    ERA: curRow[11],
                    walks: curRow[12],
                    strikeouts: curRow[13],
                    opponentAverage: curRow[14],
                };
                seasons.push(curSeason);
            }

        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return seasons;
    }

    async retrieveFavoritePlayersForUser(username: string): Promise<string[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const playerIDs: string[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', username)
                .execute('Users.RetrievePlayerFav');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                playerIDs.push(curRow[0]);
            }
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return playerIDs;
    }

    async mapPlayerIdToName(playerID: string): Promise<string[]> {
        const pool = new ConnectionPool(this.configService.dbConfig);

        const playerName: string[] = [];

        try {
            await pool.connect();

            const result = await pool.request()
                .input('PlayerId', playerID)
                .execute('Stats.MapPlayerIdToName');

            playerName.push(result.recordset[0].FullName);
        } catch (err) {
            Logger.log(err);
        } finally {
            if (pool.connected) {
                pool.close();
            }
        }

        return playerName;
    }

    async addFavoritePlayerForUser(userFavPlayer: UserFavoritePlayer): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let favoriteAdded = false;

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', userFavPlayer.username)
                .input('PlayerId', userFavPlayer.playerID)
                .execute('Users.CreatePlayerFav');

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

    async deleteFavoritePlayerForUser(userFavPlayer: UserFavoritePlayer): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let favoriteDeleted = false;

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', userFavPlayer.username)
                .input('PlayerId', userFavPlayer.playerID)
                .execute('Users.DelPlayerFav');

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
