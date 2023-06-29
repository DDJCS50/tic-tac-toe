const createGameBoard = (function() {

    let gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    return {gameBoard};
})();

const playerFactory = (name, symbol) => {
    let isMyTurn = false;
    return {name, symbol, isMyTurn};
};

const playerNames = (function() {
    let playerOneName;
    let playerTwoName;

    const getNames = () => {
        playerOne.name = document.querySelector('#playerOneName').value;
        playerTwo.name = document.querySelector('#playerTwoName').value;
        if (playerOne.name == '') playerOne.name = 'Thor';
        if (playerTwo.name == '') playerTwo.name = 'Loki';
    };

    if (document.querySelector('#playerOneName').value == '') {
        playerOneName = 'Thor'
    } else {
        playerOneName = document.querySelector('#playerOneName').value;
    };

    if (document.querySelector('#playerTwoName').value == '') {
        playerTwoName = 'Loki'
    } else {
        playerTwoName = document.querySelector('#playerTwoName').value;
    };

    if (playerOneName == null) playerOneName = 'Thor';
    if (playerTwoName == null) playerTwoName = 'Loki';

    return {
        playerOneName,
        playerTwoName,
        getNames
    }

})();

let playerOne = playerFactory(playerNames.playerOneName, 'X');
let playerTwo = playerFactory(playerNames.playerTwoName, 'O');



const renderGameBoard = (function() {
    let elements = document.querySelectorAll('.card');

    let resetGameBtn = document.querySelector('#resetGameBtn');
    resetGameBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        gameBoardState.endGame();
    });

    let startGameBtn = document.querySelector('#startGameBtn');
    let playerNamesDisplay = document.querySelector('#playerNamesDisplay');
    startGameBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        playerNames.getNames();
        playerNamesDisplay.innerText = `${playerOne.name} vs ${playerTwo.name}`;
        document.querySelector('#winnerDisplay').innerText = '';
    });

    elements.forEach(function(elem, index) {
        elem.id = index;
        elem.addEventListener('click', function() {
            if (elem.firstElementChild.innerText == '') {
                if (playerOne.isMyTurn == true) {
                    elem.firstElementChild.innerText = 'X';
                    playerOne.isMyTurn = false;
                    playerTwo.isMyTurn = true;
                } else {
                    elem.firstElementChild.innerText = 'O';
                    playerOne.isMyTurn = true;
                    playerTwo.isMyTurn = false;
                }
                gameBoardState.updateBoard();
            } else if (elem.firstElementChild.innerText != 'X' && elem.firstElementChild.innerText != 'O') {
                elem.firstElementChild.innerText = '';
            }
        });
    });

    playerOne.isMyTurn = true;
    return {
        elements,
        playerNamesDisplay
    };

})();

const gameBoardState = (function() {

    createGameBoard.gameBoard.flat(1);
    const updateBoard = () => {
        for (let i = 0; i < 9; i++) {
            let mark = document.getElementById(i).innerText;
            if (mark == 'X' || mark == 'O' || mark == '') {
                createGameBoard.gameBoard[i] = mark;
            } else {
                mark = '';
            };
        };
        let newBoardColumns = [], size = 3;
        
        while (createGameBoard.gameBoard.length > 0) {
            newBoardColumns.push(createGameBoard.gameBoard.splice(0, size));
        };

        let newBoardRowsFlat = [];
        let newBoardRows = [];
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                newBoardRowsFlat.push(newBoardColumns[k][j]);
            };
        };

        while (newBoardRowsFlat.length > 0) {
            newBoardRows.push(newBoardRowsFlat.splice(0, size));
        };

        checkWinner(newBoardColumns, newBoardRows);
    };

    const checkWinner = (boardColumns, boardRows) => {
        let winnerExists = false;
        let winnerDisplay = document.querySelector('#winnerDisplay');

        boardColumns.forEach(function(column, index) {
            if (column[0] == column[1] && column[0] == column[2]) {
                if (column[0] == 'X') {
                    winnerDisplay.innerText = `${playerOne.name} Wins!`;
                    winnerExists = true;
                    endGame();
                    return;
                } else if (column[0] == 'O') {
                    winnerDisplay.innerText = `${playerTwo.name} Wins!`;
                    winnerExists = true;
                    endGame();
                    return;
                };
            };
        });

        boardRows.forEach(function(row, index) {
            if (row[0] == row[1] && row[0] == row[2]) {
                if (row[0] == 'X') {
                    winnerDisplay.innerText = `${playerOne.name} Wins!`;
                    winnerExists = true;
                    endGame();
                    return;
                } else if (row[0] == 'O') {
                    winnerDisplay.innerText = `${playerTwo.name} Wins!`;
                    winnerExists = true;
                    endGame();
                    return;
                };
            };
        });

        
        if (boardColumns[0][0] == boardColumns[1][1] && boardColumns[0][0] == boardColumns[2][2]) {
            if (boardColumns[0][0] == 'X') {
                winnerDisplay.innerText = `${playerOne.name} Wins!`;
                winnerExists = true;
                endGame();
                return;
            } else if (boardColumns[0] == 'O') {
                winnerDisplay.innerText = `${playerTwo.name} Wins!`;
                winnerExists = true;
                endGame();
                return;
            };
        } else if (boardColumns[2][0] == boardColumns[1][1] && boardColumns[2][0] == boardColumns[0][2]) {
            if (boardColumns[2][0] == 'X') {
                winnerDisplay.innerText = `${playerOne.name} Wins!`;
                winnerExists = true;
                endGame();
                return;
            } else if (boardColumns[0] == 'O') {
                winnerDisplay.innerText = `${playerTwo.name} Wins!`;
                winnerExists = true;
                endGame();
                return;
            };
        };

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boardColumns[i][j] == '') {
                    return;
                } else if (i * j == 4 && winnerExists == false) {
                    winnerDisplay.innerText = 'It\'s a Tie!';
                    endGame();
                } else if (boardColumns[i][j] == 'X' || boardColumns[i][j] == 'O') {
                    continue;
                }
            };
        };
    };

    const endGame = () => {
        createGameBoard.gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        renderGameBoard.elements.forEach(function(elem, index) {
            elem.firstElementChild.innerText = '';
        });

        playerOne.isMyTurn = true;
        playerTwo.isMyTurn = false;
        winnerExists = false;
        playerOne.name = '';
        playerTwo.name = '';
        document.querySelector('#playerOneName').value = '';
        document.querySelector('#playerTwoName').value = '';
        renderGameBoard.playerNamesDisplay.innerText = 'Player vs Player';
    };


    return {updateBoard, endGame};

})();