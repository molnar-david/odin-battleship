const validGameboardSquares = [...Array(100).keys()];

function computerTurn(player) {
    const randomValidGameboardSquare = validGameboardSquares.splice(Math.floor(Math.random() * validGameboardSquares.length), 1)
    const x = Math.floor(randomValidGameboardSquare / 10);
    const y = randomValidGameboardSquare % 10;
    player.gameboard.receiveAttack(x, y);
    return [x, y];
}

module.exports = computerTurn;
