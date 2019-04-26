import { Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';

import { ConfigurationService } from '../configuration/configuration.service';
import { Player } from './interfaces/player.interface';
import { UserFavoritePlayer } from './interfaces/user-favorite-player.interface';

@Injectable()
export class PlayerService {
    constructor(private configService: ConfigurationService) { }

    async retrieveAllPlayers(): Promise<Player[]> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        const players: Player[] = [];

        try {
            await pool.connect();

            const result = await pool.request().execute('Stats.ListPlayers');

            const resultAsTable = result.recordset.toTable();

            for (const curRow of resultAsTable.rows) {
                /*
                const curPlayer: Player = {
                };
                players.push(curPlayer);
                */
               Logger.log(curRow);
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

    async addFavoritePlayerForUser(userFavPlayer: UserFavoritePlayer): Promise<boolean> {

        const pool = new ConnectionPool(this.configService.dbConfig);

        let favoriteAdded = false;

        try {
            await pool.connect();

            const result = await pool.request()
                .input('Username', userFavPlayer.username)
                .input('TeamId', userFavPlayer.playerID)
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
                .input('TeamId', userFavPlayer.playerID)
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
