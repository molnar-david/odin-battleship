import "./styles/styles.css";
import "./dom.js";

const Player = require('./Player');
// const Gameboard = require('./Gameboard');
// const Ship = require('./Ship');

const gameboards = Array.from(document.getElementsByClassName('gameboard'));
gameboards.forEach((gameboard) => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const gameboardSquare = document.createElement('div');
            gameboardSquare.classList.add('gameboard-square');
            gameboard.appendChild(gameboardSquare);
        }
    }
})

const playerGameboard = gameboards[0];
const computerGameboard = gameboards[1];
const player = new Player('Player');
const computer = new Player();

player.gameboard.placeShip(0, 0, 5);
player.gameboard.placeShip(2, 2, 4);
player.gameboard.placeShip(7, 5, 3);
player.gameboard.placeShip(4, 6, 3);
player.gameboard.placeShip(6, 8, 2);

computer.gameboard.placeShip(3, 9, 5);
computer.gameboard.placeShip(5, 7, 4);
computer.gameboard.placeShip(0, 4, 3);
computer.gameboard.placeShip(1, 3, 3);
computer.gameboard.placeShip(7, 1, 2);

const playerGameboardSquares = Array.from(playerGameboard.getElementsByClassName('gameboard-square'));
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (typeof player.gameboard.board[i][j] === 'object') {
            playerGameboardSquares[i*10+j].classList.add('ship');
        }
    }
}

const computerGameboardSquares = Array.from(computerGameboard.getElementsByClassName('gameboard-square'));
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (typeof computer.gameboard.board[i][j] === 'object') {
            computerGameboardSquares[i*10+j].classList.add('ship');
        }
    }
}
