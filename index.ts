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
createPlayBaord();
let match = new Cricket();