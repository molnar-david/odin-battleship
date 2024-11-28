const Player = require('./Player');
const { initGameboards, renderGameboards, renderAttack, hideElements, showElements } = require('./dom.js');

let player;
let clone;
let computer;
let validGameboardSquares;
let isPlayerTurn = false;
let mouseoverSquareDivs = [];
let isHorizontal = true;

let computerPredictionCoords = [];

function computerTurn() {
    let x;
    let y;
    const attackOffsets = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];
    const playerGameboardDiv = document.getElementById('player-gameboard');
    const playerGameboardSquareDivs = Array.from(playerGameboardDiv.getElementsByClassName('gameboard-square'));
    if (computerPredictionCoords.length) {
        [x, y] = [...computerPredictionCoords.shift()];
        validGameboardSquares.splice(validGameboardSquares.indexOf(x + y*10), 1);
    } else {
        const randomValidGameboardSquare = validGameboardSquares.splice(Math.floor(Math.random() * validGameboardSquares.length), 1);
        x = randomValidGameboardSquare % 10;
        y = Math.floor(randomValidGameboardSquare / 10);
        console.log('');
    }
    if (player.gameboard.receiveAttack(x, y)) {
        attackOffsets.forEach((attackOffset) => {
            const nextX = x + attackOffset[0];
            const nextY = y + attackOffset[1];
            const isOutOfBounds = (nextX < 0 || nextX >= 10 || nextY < 0 || nextY >= 10);
            const isQueued = JSON.stringify(computerPredictionCoords).includes(JSON.stringify([nextX, nextY]));
            if (!isOutOfBounds && !isQueued) {
                const isAlreadyHit = playerGameboardSquareDivs[nextX+nextY*10].classList.contains('hit');
                if (!isAlreadyHit) computerPredictionCoords.push([nextX, nextY]);
            }
        });
    }
    return [x, y];
}

function gameOver(winner) {
    console.log(`${winner.name} wins`);
    isPlayerTurn = false;
    const replayBtn = document.getElementById('replay-btn');
    showElements(replayBtn);
}

function placeShipOnClick(player, x, y, shipLength) {
    const coords = player.gameboard.placeShip(x, y, shipLength, isHorizontal);
    return coords;
}

function getNextShipLength(player) {
    switch (player.gameboard.ships.length) {
        case 0:
            return 5;
        case 1:
            return 4;
        case 2:
            return 3;
        case 3:
            return 3;
        case 4:
            return 2;
        default:
            return 0;
    }
}

function clearSquareValidity() {
    if (mouseoverSquareDivs.length) {
        mouseoverSquareDivs.forEach((div) => {
            div.classList.remove('valid');
            div.classList.remove('invalid');
        });
        mouseoverSquareDivs = [];
    }
}

function initPlayerSquares() {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    const playerGameboardSquareDivs = Array.from(playerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const playerGameboardSquareDiv = playerGameboardSquareDivs[i+j*10];
            playerGameboardSquareDiv.addEventListener('click', (event) => {
                if (!clone) clone = player.clone();
                let shipLength = getNextShipLength(clone);
                placeShipOnClick(clone, i, j, shipLength);
                renderGameboards(clone, computer);
            });

            playerGameboardSquareDiv.addEventListener('mouseover', (event) => {
                clearSquareValidity();
                if (!clone) clone = player.clone();
                let temp = clone.clone();
                let shipLength = getNextShipLength(temp);
                let validityClass = placeShipOnClick(temp, i, j, shipLength).length ? 'valid' : 'invalid';
                if (isHorizontal) {
                    for (let k = i; k < Math.min(i + shipLength, 10); k++) {
                        const mouseoverSquareDiv = playerGameboardSquareDivs[k+j*10];
                        mouseoverSquareDiv.classList.add(validityClass);
                        mouseoverSquareDivs.push(mouseoverSquareDiv);
                    }
                } else {
                    for (let l = j; l < Math.min(j + shipLength, 10); l++) {
                        const mouseoverSquareDiv = playerGameboardSquareDivs[i+l*10];
                        mouseoverSquareDiv.classList.add(validityClass);
                        mouseoverSquareDivs.push(mouseoverSquareDiv);
                    }
                }
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
            const computerGameboardSquareDiv = computerGameboardSquareDivs[i+j*10];
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
        const randomIsHorizontal = Math.floor(Math.random() * 2);
        if (player.gameboard.placeShip(x, y, shipLength, randomIsHorizontal).length) break;
    }
}

function initBtns() {
    const rotateBtn = document.getElementById('rotate-btn');
    rotateBtn.addEventListener('click', () => {
        clearSquareValidity();
        isHorizontal = !isHorizontal;
    });

    const autoPlaceBtn = document.getElementById('auto-place-btn');
    autoPlaceBtn.addEventListener('click', () => {
        clearSquareValidity();
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
            hideElements(rotateBtn, autoPlaceBtn, resetBtn, startBtn);
            isPlayerTurn = true;
        }
    });

    const replayBtn = document.getElementById('replay-btn');
    replayBtn.addEventListener('click', () => {
        initGame(true);
        hideElements(replayBtn);
        showElements(rotateBtn, autoPlaceBtn, resetBtn, startBtn);
    });
}

function initGame(replay = false) {
    player = new Player('Player');
    clone = null;
    computer = new Player();
    validGameboardSquares = [...Array(100).keys()];
    computerPredictionCoords = [];
    initGameboards();
    renderGameboards(player, computer);
    if (!replay) initBtns();
    initPlayerSquares();
}

module.exports = initGame;
