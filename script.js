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
        console.log(newBoardColumns);
        console.log(createGameBoard.gameBoard);
    };


    return {updateBoard};

})();