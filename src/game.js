const Player = require('./Player');
const { initGameboards, renderGameboards, renderAttack, hideElements, showElements } = require('./dom.js');

let player;
let clone;
let computer;
let validGameboardSquares;
let isPlayerTurn = false;

function computerTurn() {
    const randomValidGameboardSquare = validGameboardSquares.splice(Math.floor(Math.random() * validGameboardSquares.length), 1)
    const x = Math.floor(randomValidGameboardSquare / 10);
    const y = randomValidGameboardSquare % 10;
    player.gameboard.receiveAttack(x, y);
    return [x, y];
}

function gameOver(winner) {
    console.log(`${winner.name} wins`);
    isPlayerTurn = false;
    const replayBtn = document.getElementById('replay-btn');
    showElements(replayBtn);
}

function placeShipOnClick(x, y, shipLength) {
    const coords = clone.gameboard.placeShip(x, y, shipLength);
}

function initPlayerSquares() {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    const playerGameboardSquareDivs = Array.from(playerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const playerGameboardSquareDiv = playerGameboardSquareDivs[i*10+j];
            playerGameboardSquareDiv.addEventListener('click', (event) => {
                if (!clone) clone = player.clone();
                let shipLength;
                switch (clone.gameboard.ships.length) {
                    case 0:
                        shipLength = 5;
                        break;
                    case 1:
                        shipLength = 4;
                        break;
                    case 2:
                        shipLength = 3;
                        break;
                    case 3:
                        shipLength = 3;
                        break;
                    case 4:
                        shipLength = 2;
                        break;
                    default:
                        return;
                }
                placeShipOnClick(i, j, shipLength);
                renderGameboards(clone, computer);
            });
        }
    }
}

function initComputerSquares() {
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
    computerGameboardDiv.classList.remove('inactive');
}

function placeShipRandomly(player, shipLength) {
    let isValidPlacement = false;
    while (true) {
        const x = Math.floor(Math.random() * (10 - shipLength + 1));
        const y = Math.floor(Math.random() * 10);
        if (player.gameboard.placeShip(x, y, shipLength).length) break;
    }
}

function initBtns() {
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
        clone = null;
        renderGameboards(player, computer);
    });

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        if (clone && clone.gameboard.ships.length === 5) {
            player = clone;
            placeShipRandomly(computer, 5);
            placeShipRandomly(computer, 4);
            placeShipRandomly(computer, 3);
            placeShipRandomly(computer, 3);
            placeShipRandomly(computer, 2);
            renderGameboards(player, computer);
            initComputerSquares();
            hideElements(autoPlaceBtn, resetBtn, startBtn);
            isPlayerTurn = true;
        }
    });

    const replayBtn = document.getElementById('replay-btn');
    replayBtn.addEventListener('click', () => {
        initGame(true);
        hideElements(replayBtn);
        showElements(autoPlaceBtn, resetBtn, startBtn);
    });
}

function initGame(replay = false) {
    player = new Player('Player');
    clone = null;
    computer = new Player();
    validGameboardSquares = [...Array(100).keys()];
    initGameboards();
    renderGameboards(player, computer);
    if (!replay) initBtns();
    initPlayerSquares();
}

module.exports = initGame;
