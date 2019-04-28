export interface TeamSeason {
    teamName: string;
    year: number;
    league: string;
    wins: number;
    losses: number;
    winLossRatio: number;
    wsWinner: string;
    runsScored: number;
    runsAgainst: number;
    hittingStats: string;
    hitsAllowed: number;
    errors: number;
    homeAttendance: number;
}
