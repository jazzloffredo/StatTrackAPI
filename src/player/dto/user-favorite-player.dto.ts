import { IsAlphanumeric } from 'class-validator';

export class UserFavoritePlayerDTO {
    @IsAlphanumeric()   readonly username: string;
                        readonly playerID: string;

    constructor(username: string, playerID: string) {
        this.username = username;
        this.playerID = playerID;
    }
}