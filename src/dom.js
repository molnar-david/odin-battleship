const computerTurn = require('./AI');

let isPlayerTurn = true;

function renderAttack(gameboardDiv, x, y) {
    const gameboardSquareDivs = Array.from(gameboardDiv.getElementsByClassName('gameboard-square'));
    gameboardSquareDivs[x*10+y].classList.add('hit');
}

function renderGameboards(player, computer) {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    const playerGameboardSquareDivs = Array.from(playerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof player.gameboard.board[i][j] === 'object') {
                playerGameboardSquareDivs[i*10+j].classList.add('ship');
            } else {
                playerGameboardSquareDivs[i*10+j].classList.remove('ship');
            }
        }
    }
    
    const computerGameboardDiv = document.getElementById('computer-gameboard');
    const computerGameboardSquareDivs = Array.from(computerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof computer.gameboard.board[i][j] === 'object') {
                computerGameboardSquareDivs[i*10+j].classList.add('ship');
            } else {
                computerGameboardSquareDivs[i*10+j].classList.remove('ship');
            }
        }
    }
}

function initGameboards(player, computer) {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const gameboardSquareDiv = document.createElement('div');
            gameboardSquareDiv.classList.add('gameboard-square');
            playerGameboardDiv.appendChild(gameboardSquareDiv);
        }
    }
    
    const computerGameboardDiv = document.getElementById('computer-gameboard');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const gameboardSquareDiv = document.createElement('div');
            gameboardSquareDiv.classList.add('gameboard-square');
            gameboardSquareDiv.addEventListener('click', (event) => {
                if (isPlayerTurn) {
                    computer.gameboard.receiveAttack(i, j);
                    renderAttack(computerGameboardDiv, i, j);
                    if (computer.gameboard.areAllShipsSunk) {
                        console.log('Player wins');
                        isPlayerTurn = false;
                        return;
                    }
                    renderAttack(playerGameboardDiv, ...computerTurn(player));
                    if (player.gameboard.areAllShipsSunk) {
                        console.log('Computer wins');
                        return;
                    }
                    isPlayerTurn = true;
                }
            }, { once: true });
            computerGameboardDiv.appendChild(gameboardSquareDiv);
        }
    }

    placeShipRandomly(computer, 5);
    placeShipRandomly(computer, 4);
    placeShipRandomly(computer, 3);
    placeShipRandomly(computer, 3);
    placeShipRandomly(computer, 2);
    renderGameboards(player, computer);
}

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

function initBtns(player, computer) {
    const autoPlaceBtn = document.getElementById('auto-place-btn');
    autoPlaceBtn.addEventListener('click', () => {
        const clone = player.clone();
        placeShipRandomly(clone, 5);
        placeShipRandomly(clone, 4);
        placeShipRandomly(clone, 3);
        placeShipRandomly(clone, 3);
        placeShipRandomly(clone, 2);
        renderGameboards(clone, computer);
    });
}

module.exports = { initGameboards, initBtns };
