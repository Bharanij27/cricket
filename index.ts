import { Cricket } from './cricketClasses';

let createTable = (teamName: string): HTMLTableElement => {
    let table = <HTMLTableElement>document.createElement('table');
    table.classList.add('table', 'table-bordered');

    let caption = <HTMLTableCaptionElement>document.createElement('caption');
    caption.classList.add('team-table-caption')
    caption.innerText = teamName + ' SCORE BOARD';

    let header = createHeader(teamName);
    let tbody = createBody(teamName);
    table.append(caption, header, tbody);
    return table
}

let createBody = (team: string) => {
    let tableBody = document.createElement('tbody');

    for (let i = 1; i <= 10; i++) {
        let row = createScoreBody(i, team);
        tableBody.append(row);
    }
    return tableBody;
}

let createScoreBody = (index: number, team: string): HTMLTableRowElement => {
    let tr = <HTMLTableRowElement>document.createElement('tr');

    for (let i = 0; i < 8; i++) {
        let tag = (i == 0) ? 'th' : 'td';
        let cell = <HTMLTableCellElement>document.createElement(tag);

        if (tag == 'th') cell.scope = "row";
        if (i == 0) cell.innerText = 'Player ' + index;
        else cell.innerHTML = `<span id="${team + (index - 1).toString() + (i - 1).toString()}"></span>`;

        tr.append(cell);
    }
    return tr;
}

let createHeader = (teamName: string): HTMLTableSectionElement => {
    let theader = <HTMLTableSectionElement>document.createElement('thead');
    let tr = <HTMLTableRowElement>document.createElement('tr');
    let scope = 'col';

    for (let i = 0; i < 8; i++) {
        let th = <HTMLTableHeaderCellElement>document.createElement('th');
        th.scope = scope;
        if (i == 0) th.innerText = teamName;
        else if (i == 7) th.innerText = 'TOTAL'
        else th.innerText = 'B' + i;
        tr.append(th);
    }

    theader.append(tr);
    return theader;
}
let teamPlayed = false

let startTimer = (timer: HTMLParagraphElement, player: string) => {
    alert(`${player} get ready to play`);

    let seconds: number = 60;
    let setTimer = setInterval(() => {
        if (seconds < 0 || teamPlayed) {
            teamPlayed = false;
            clearInterval(setTimer);
            if (player !== 'Player 2') {
                (<HTMLButtonElement>document.getElementById('team1')).disabled = true;
                (<HTMLButtonElement>document.getElementById('team2')).disabled = false
                startTimer(timer, 'Player 2');

            }
            else {
                clearTimer();
                alert('Both player played....')
            }
        }

        (seconds != -1) ? timer.innerText = seconds.toString() : '';
        seconds--;
    }, 1000);
};

let clearTimer = () => {
    (<HTMLButtonElement>document.getElementById('team2')).disabled = true;
    resultButton.disabled = false;
}

let generateScore = () => {
    return Math.floor(Math.random() * (7 - 0) + 0);
}

let computeResult = () => {
    let winner = match.chennai.teamScore > match.mumbai.teamScore ? match.chennai : match.mumbai;
    let winnerName = winner.name.toUpperCase();
    matchResult.innerHTML = `MATCH WON BY <p> ${winnerName} </p>`;
    bestPlayer.innerHTML = `MAN OF THE MATCH <p>by ${winner.maxScore.player}</p> <p>${winnerName}</p> <p> Score :${winner.maxScore.score}</p>`;
}

let changeContent = () => {
    matchResult.innerText = 'MATCH WON BY';
    bestPlayer.innerHTML = `MAN OF THE MATCH `;
}

let craeteCol5 = (num : number) : HTMLDivElement => {
    let col = <HTMLDivElement>document.createElement('div');
    col.classList.add('col-5');

    let teamname = <HTMLDivElement>document.createElement('div');
    teamname.classList.add('team-name');
    teamname.innerText = `Team ${num} Score` ;

    let score = <HTMLDivElement>document.createElement('div');
    score.classList.add('score', 'm-1')
    score.id = `team-${num}-score`;
    score.innerText = "0";

    let hitButton = <HTMLButtonElement>document.createElement('button');
    hitButton.classList.add('btn', 'btn-sm', 'btn-primary');
    hitButton.id = `team${num}`
    hitButton.disabled = true;
    hitButton.innerText = `HIT ${num}`;

    col.append(teamname, score, hitButton);
    return col
}


let createPlayBaord = () => {
    let table1 = createTable('Team 1');
    let t1 = (<HTMLDivElement>document.getElementsByClassName('team-score-board-1')[0]);
    while (t1.children.length) t1.removeChild(t1.firstElementChild)
    t1.append(table1);

    let table2 = createTable('Team 2');
    let t2 = (<HTMLDivElement>document.getElementsByClassName('team-score-board-2')[0]);
    while (t2.children.length) t2.removeChild(t2.firstElementChild)

    t2.append(table2);
    match = new Cricket()
}



let container = <HTMLDivElement>document.createElement('div');
container.classList.add('contianer','m-3', 'text-center', 'justify-content-center');

let heading = <HTMLDivElement>document.createElement('div')
heading.classList.add('heading');
heading.innerText = 'CRICKET';

let hr1 = <HTMLHRElement>document.createElement('hr');
let hr2 = <HTMLHRElement>document.createElement('hr');
let hr3 = <HTMLHRElement>document.createElement('hr');

let teamrow = <HTMLDivElement>document.createElement('div');
teamrow.classList.add('row');

let team1col = craeteCol5(1);
let team2col = craeteCol5(2);

let timerCol = <HTMLDivElement>document.createElement('div');
timerCol.classList.add('col-2');

let timerDiv = <HTMLDivElement>document.createElement('div');
timerDiv.classList.add('timer', 'none');
timerDiv.innerText = 'Timer';

let countdown = <HTMLParagraphElement>document.createElement('p');
countdown.classList.add('count-down');

timerDiv.append(countdown);

let start = document.createElement('button');
start.classList.add('btn', 'btn-sm', 'btn-primary', 'center');
start.id = 'start';
start.innerText = 'Start';

timerCol.append(timerDiv, start);
teamrow.append(team1col, timerCol, team2col);

let scoreBoard = <HTMLDivElement>document.createElement('div');
scoreBoard.classList.add('scoreBoard');

let scoreRow = <HTMLDivElement>document.createElement('div');
scoreRow.classList.add('row');

let team1ScoreCol = <HTMLDivElement>document.createElement('div');
team1ScoreCol.classList.add('col-5');

let team1Board = <HTMLDivElement>document.createElement('div');
team1Board.classList.add('team-score-board-1');

team1ScoreCol.append(team1Board);

let resultField = <HTMLDivElement>document.createElement('div');
resultField.classList.add('col-2', 'mt-5', 'result');

let resultBtn = <HTMLButtonElement>document.createElement('button');
resultBtn.classList.add('result-btn', 'btn', 'btn-sm', 'btn-primary');
resultBtn.disabled = true;
resultBtn.innerText = 'GENERATE RESULT';

let matchResultTag = <HTMLParagraphElement>document.createElement('p');
matchResultTag.classList.add('match-result', 'light', 'mt-3')
matchResultTag.innerText = 'MATCH WON BY';

let bestPlayerTag = <HTMLParagraphElement>document.createElement('p');
bestPlayerTag.classList.add('best-player', 'light',)
bestPlayerTag.innerText = 'MAN OF THE MATCH';

resultField.append(resultBtn, matchResultTag, hr3, bestPlayerTag);

let team2ScoreCol = <HTMLDivElement>document.createElement('div');
team2ScoreCol.classList.add('col-5');

let team2Board = <HTMLDivElement>document.createElement('div');
team2Board.classList.add('team-score-board-2');

team2ScoreCol.append(team2Board);

scoreRow.append(team1ScoreCol, resultField, team2ScoreCol);
scoreBoard.append(scoreRow);

container.append(heading, hr1, teamrow, hr2, scoreBoard);

document.body.append(container);



// <div class="contianer m-3 text-center justify-content-center">
// <div class="heading">
//     CRICKET
// </div>
// <hr>
// <div class="row">
//     <div class="col-5">
//         <div class="team-name">
//             Team 1 Score
//         </div>
//         <div class="score m-1" id="team-1-score">0</div>
//         <button class="btn btn-sm btn-primary" id="team1" disabled>HIT 1</button>
//     </div>
//     <div class="col-2">
//         <div class="timer none">
//             Timer
//             <p class="count-down"></p>
//         </div>
//         <button class="center btn btn-sm btn-primary" id="start">Start</button>
//     </div>
//     <div class="col-5">
//         <div class="team-name">
//             Team 2 Score
//         </div>
//         <div class="score  m-1" id="team-2-score">0</div>
//         <button class="btn btn-sm btn-primary" id="team2" disabled>HIT 2</button>
//     </div>
// </div>
// <hr>
// <div class="scoreBoard">
//     <div class="row">
//         <div class="col-5">
//             <div class="team-score-board-1"></div>
//         </div>
//         <div class="col-2  mt-5 result">
//             <button class="result-btn btn btn-sm btn-primary" disabled>GENERATE RESULT</button>
//             <p class="match-result light mt-3">MATCH WON BY</p>
//             <hr>
//             <p class="best-player light">MAN OF THE MATCH</p>
//         </div>
//         <div class="col-5">
//             <div class="team-score-board-2"></div>
//         </div>
//     </div>
// </div>
// </div>
createPlayBaord();
let match = new Cricket(); 



let startButton = <HTMLButtonElement>document.getElementById('start');
let timer = <HTMLDivElement>document.getElementsByClassName('timer')[0];
let resultButton = (<HTMLButtonElement>document.getElementsByClassName('result-btn')[0]);
let team1 = (<HTMLButtonElement>document.getElementById('team1'));
let team2 = (<HTMLButtonElement>document.getElementById('team2'));
let team1Score = (<HTMLDivElement>document.getElementById('team-1-score'));
let team2Score = (<HTMLDivElement>document.getElementById('team-2-score'));
let matchResult = (<HTMLParagraphElement>document.getElementsByClassName('match-result')[0])
let bestPlayer = (<HTMLParagraphElement>document.getElementsByClassName('best-player')[0]);

startButton.addEventListener('click', (element) => {
    startButton.classList.add('none');
    timer.classList.remove('none');
    team1Score.innerText = '0';
    team2Score.innerText = '0';

    startTimer(timer.querySelector('p'), 'Player 1');
    (<HTMLButtonElement>document.getElementById('team1')).disabled = false
    changeContent();
    if((<HTMLDivElement>document.getElementsByClassName('team-score-board-1')[0]).children.length){
        createPlayBaord();
    }
});

resultButton.addEventListener('click', () => {
    timer.classList.add('none');
    startButton.classList.remove('none');
    computeResult();
    resultButton.disabled = true;
});

team1.addEventListener('click', () => {
    let score = generateScore();
    let isValid = match.chennai.updateTeamScore(score);
    team1Score.innerText = match.chennai.teamScore.toString();
    if (!isValid)
        teamPlayed = true;
})

team2.addEventListener('click', () => {
    let score = generateScore();
    let isValid = match.mumbai.updateTeamScore(score);
    team2Score.innerText = match.mumbai.teamScore.toString();
    if (!isValid) teamPlayed = true;
})
