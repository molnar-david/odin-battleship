const Player = require('./Player');
const { initGameboards, renderGameboards, renderAttack, hideElements } = require('./dom.js');
const computerTurn = require('./AI');

let player;
let computer;
let isPlayerTurn = false;

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

function gameOver(winner) {
    console.log(`${winner.name} wins`);
    isPlayerTurn = false;
}

function initSquares() {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    const computerGameboardDiv = document.getElementById('computer-gameboard');
    const computerGameboardSquareDivs = Array.from(computerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const computerGameboardSquareDiv = computerGameboardSquareDivs[i*10+j];
            computerGameboardSquareDiv.addEventListener('click', (event) => {
                if (isPlayerTurn) {
                    computer.gameboard.receiveAttack(i, j);
                    renderAttack(computerGameboardDiv, i, j);
                    if (computer.gameboard.areAllShipsSunk) {
                        gameOver(player);
                        return;
                    }
                    renderAttack(playerGameboardDiv, ...computerTurn(player));
                    if (player.gameboard.areAllShipsSunk) {
                        gameOver(computer);
                        return;
                    }
                    isPlayerTurn = true;
                }
            }, { once: true });
        }
    }
}

function initBtns() {
    let clone;
    const autoPlaceBtn = document.getElementById('auto-place-btn');
    autoPlaceBtn.addEventListener('click', () => {
        clone = player.clone();
        placeShipRandomly(clone, 5);
        placeShipRandomly(clone, 4);
        placeShipRandomly(clone, 3);
        placeShipRandomly(clone, 3);
        placeShipRandomly(clone, 2);
        renderGameboards(clone, computer);
    });

    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', () => {
        renderGameboards(player, computer);
    });

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        player = clone;
        placeShipRandomly(computer, 5);
        placeShipRandomly(computer, 4);
        placeShipRandomly(computer, 3);
        placeShipRandomly(computer, 3);
        placeShipRandomly(computer, 2);
        renderGameboards(player, computer);
        initSquares();
        hideElements(autoPlaceBtn, resetBtn, startBtn);
        isPlayerTurn = true;
    });
}

function initGame() {
    player = new Player('Player');
    computer = new Player();
    initGameboards();
    renderGameboards(player, computer);
    initBtns();
}

module.exports = initGame;
