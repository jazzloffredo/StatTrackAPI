import { IsAlphanumeric } from 'class-validator';

export class UserFavoriteTeamDTO {
    @IsAlphanumeric()   readonly username: string;
                        readonly teamID: string;

    constructor(username: string, teamID: string) {
        this.username = username;
        this.teamID = teamID;
    }
}
