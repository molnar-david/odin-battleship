const Player = require('./Player');
const { initGameboards, renderGameboards } = require('./dom.js');

function placeShipRandomly(player, shipLength) {
    let isValidPlacement = false;
    while (!isValidPlacement) {
        const x = Math.floor(Math.random() * (10 - shipLength));
        const y = Math.floor(Math.random() * 10);
        const clone = player.gameboard.clone();
        const coords = clone.placeShip(x, y, shipLength);

        const isOutOfBounds = !Boolean(coords.length);
        const isTaken = coords.some((coord) => typeof player.gameboard.board[coord[0]][coord[1]] === 'object');
        if (isValidPlacement = !isOutOfBounds && !isTaken) player.gameboard.placeShip(x, y, shipLength);
    }
}

function initGame() {
    const player = new Player('Player');
    const computer = new Player();
    initGameboards(player, computer);

    placeShipRandomly(player, 5);
    placeShipRandomly(player, 4);
    placeShipRandomly(player, 3);
    placeShipRandomly(player, 3);
    placeShipRandomly(player, 2);
    
    placeShipRandomly(computer, 5);
    placeShipRandomly(computer, 4);
    placeShipRandomly(computer, 3);
    placeShipRandomly(computer, 3);
    placeShipRandomly(computer, 2);
    renderGameboards(player, computer);
}

module.exports = initGame;
