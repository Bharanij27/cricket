interface maxScore {
    player : string;
    score : number; 
}

export class Cricket {

    chennai: Team;
    mumbai: Team;
    currentTeam: Team;

    constructor() {
        this.chennai = new Team('Team 1');
        this.mumbai = new Team('Team 2');
        this.currentTeam = this.chennai;
    }
}

class Team {

    players: Player[] = [];
    currentPlayer: number;
    teamScore: number;
    name : string
    maxScore: maxScore;

    constructor(name : string) {
        for (let i = 0; i < 10; i++) {
            this.players[i] = new Player();
        }
        this.currentPlayer = 0;
        this.teamScore = 0;
        this.name = name;
        this.maxScore = {
            player : 'player 0',
            score : 0
        };
    }

    updateTeamScore(score: number): number {
        this.teamScore += score;
        let isOut = this.players[this.currentPlayer].updatePlayerScore(score, this.currentPlayer, this.name);
        if(this.maxScore.score < this.players[this.currentPlayer].playerScore){
            this.maxScore = {
                player : 'Player ' + (this.currentPlayer + 1),
                score : this.players[this.currentPlayer].playerScore
            }
        }
        if(isOut) this.currentPlayer++;
        
        if (this.currentPlayer == 10) return 0;
        return 1;
    }
}

class Player {

    balls: Ball[] = []
    currentBall: number;
    playerScore : number;

    constructor() {
        for (let i = 0; i < 6; i++) {
            this.balls[i] = new Ball();
        }
        this.currentBall = 0;
        this.playerScore = 0;
    }

    updatePlayerScore(score: number, player: number, team : string): number {
        try {
            this.balls[this.currentBall].score = score;
            this.playerScore += score;
            document.getElementById(team + player.toString() + this.currentBall.toString()).innerText = score.toString();
            document.getElementById(team + player.toString() + '6').innerText = this.playerScore.toString();
            this.currentBall++;
            if (this.currentBall === 6 || score === 0) {
                return 1;
            }
            return 0;
        } catch (error) {
            console.log(error)
        }
    }
}

class Ball {
    score: number;

    constructor() {
        this.score = 0;
    }
}
