const createGameBoard = (function() {

    let _gameBoard = [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['X', 'O', 'X']
    ];
})();

const playerFactory = (name, symbol) => {
    return {name, symbol}
};