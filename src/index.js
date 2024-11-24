import "./styles/styles.css";

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
