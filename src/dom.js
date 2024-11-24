function initGameboards(player, computer) {
    const playerGameboard = document.getElementById('player-gameboard');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const gameboardSquare = document.createElement('div');
            gameboardSquare.classList.add('gameboard-square');
            playerGameboard.appendChild(gameboardSquare);
        }
    }
    
    const computerGameboard = document.getElementById('computer-gameboard');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const gameboardSquare = document.createElement('div');
            gameboardSquare.classList.add('gameboard-square');
            gameboardSquare.addEventListener('click', (event) => {
                computer.gameboard.receiveAttack(i, j);
                gameboardSquare.addEventListener
                if (typeof computer.gameboard.board[i][j] === 'object') {
                    console.log(`hits: ${computer.gameboard.board[i][j].hits}`)
                } else {
                    console.log('miss');
                }
            }, { once: true });
            computerGameboard.appendChild(gameboardSquare);
        }
    }
}

function renderGameboards(player, computer) {
    const playerGameboard = document.getElementById('player-gameboard');
    const playerGameboardSquares = Array.from(playerGameboard.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof player.gameboard.board[i][j] === 'object') {
                playerGameboardSquares[i*10+j].classList.add('ship');
            }
        }
    }
    
    const computerGameboard = document.getElementById('computer-gameboard');
    const computerGameboardSquares = Array.from(computerGameboard.getElementsByClassName('gameboard-square'));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (typeof computer.gameboard.board[i][j] === 'object') {
                computerGameboardSquares[i*10+j].classList.add('ship');
            }
        }
    }
}

module.exports = { initGameboards, renderGameboards };
