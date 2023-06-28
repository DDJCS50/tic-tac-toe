const createGameBoard = (function() {

    let gameBoard = [
        ['O', 'O', 'O'],
        ['O', 'O', 'O'],
        ['O', 'O', 'O']
    ];

    return {gameBoard};
})();

const playerFactory = (name, symbol) => {
    let isMyTurn = false;
    return {name, symbol, isMyTurn};
};

const playerOne = playerFactory('Thor', 'X');
const playerTwo = playerFactory('Loki', 'O');



const renderGameBoard = (function() {
    let elements = document.querySelectorAll('.card');

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
        console.log(newBoardColumns);
        console.log(newBoardRows);
        console.log(createGameBoard.gameBoard);
    };

    const checkWinner = (boardColumns, boardRows) => {
        boardColumns.forEach(function(column, index) {
            if (column[0] == column[1] && column[0] == column[2]) {
                if (column[0] == 'X') {
                    alert(`${playerOne.name} Wins!`);
                    return;
                } else if (column[0] == 'O') {
                    alert(`${playerTwo.name} Wins!`);
                    return;
                };
            };
        });

        boardRows.forEach(function(row, index) {
            if (row[0] == row[1] && row[0] == row[2]) {
                if (row[0] == 'X') {
                    alert(`${playerOne.name} Wins!`);
                    return;
                } else if (row[0] == 'O') {
                    alert(`${playerTwo.name} Wins!`);
                    return;
                };
            };
        });
    };


    return {updateBoard};

})();