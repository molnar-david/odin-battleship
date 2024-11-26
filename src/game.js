const Player = require('./Player');
const { initGameboards, initBtns } = require('./dom.js');

function initGame() {
    const player = new Player('Player');
    const computer = new Player();
    initBtns(player, computer);
    initGameboards(player, computer);
}

module.exports = initGame;
