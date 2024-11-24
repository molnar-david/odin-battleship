const computerTurn = require('./AI');

function renderAttack(gameboardDiv, x, y) {
    const gameboardSquareDivs = Array.from(gameboardDiv.getElementsByClassName('gameboard-square'));
    gameboardSquareDivs[x*10+y].classList.add('hit');
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
                computer.gameboard.receiveAttack(i, j);
                renderAttack(computerGameboardDiv, i, j);
                renderAttack(playerGameboardDiv, ...computerTurn(player));
            }, { once: true });
            computerGameboardDiv.appendChild(gameboardSquareDiv);
        }
    }
}

function renderGameboards(player, computer) {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    const playerGameboardSquareDivs = Array.from(playerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof player.gameboard.board[i][j] === 'object') {
                playerGameboardSquareDivs[i*10+j].classList.add('ship');
            }
        }
    }
    
    const computerGameboardDiv = document.getElementById('computer-gameboard');
    const computerGameboardSquareDivs = Array.from(computerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof computer.gameboard.board[i][j] === 'object') {
                computerGameboardSquareDivs[i*10+j].classList.add('ship');
            }
        }
    }
}

module.exports = { initGameboards, renderGameboards };
