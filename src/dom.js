function renderAttack(gameboardDiv, x, y) {
    const gameboardSquareDivs = Array.from(gameboardDiv.getElementsByClassName('gameboard-square'));
    gameboardSquareDivs[x+y*10].classList.add('hit');
}

function renderGameboards(player, computer) {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    const playerGameboardSquareDivs = Array.from(playerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof player.gameboard.board[i][j] === 'object') {
                playerGameboardSquareDivs[i+j*10].classList.add('ship');
            } else {
                playerGameboardSquareDivs[i+j*10].classList.remove('ship');
            }
        }
    }
    
    const computerGameboardDiv = document.getElementById('computer-gameboard');
    const computerGameboardSquareDivs = Array.from(computerGameboardDiv.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof computer.gameboard.board[i][j] === 'object') {
                computerGameboardSquareDivs[i+j*10].classList.add('ship');
            } else {
                computerGameboardSquareDivs[i+j*10].classList.remove('ship');
            }
        }
    }
}

function initGameboards() {
    const playerGameboardDiv = document.getElementById('player-gameboard');
    playerGameboardDiv.textContent = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const gameboardSquareDiv = document.createElement('div');
            gameboardSquareDiv.classList.add('gameboard-square');
            playerGameboardDiv.appendChild(gameboardSquareDiv);
        }
    }
    
    const computerGameboardDiv = document.getElementById('computer-gameboard');
    computerGameboardDiv.classList.remove('game-over');
    computerGameboardDiv.textContent = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const gameboardSquareDiv = document.createElement('div');
            gameboardSquareDiv.classList.add('gameboard-square');
            computerGameboardDiv.appendChild(gameboardSquareDiv);
        }
    }
}

function hideElements(...elements) {
    elements.forEach((element) => element.classList.add('hidden'));
}

function showElements(...elements) {
    elements.forEach((element) => element.classList.remove('hidden'));
}

module.exports = { initGameboards, renderGameboards, renderAttack, hideElements, showElements };
