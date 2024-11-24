import "./styles/styles.css";
import { initGameboards, renderGameboards } from "./dom.js";

const Player = require('./Player');
// const Gameboard = require('./Gameboard');
// const Ship = require('./Ship');

const player = new Player('Player');
const computer = new Player();
initGameboards(player, computer);

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
renderGameboards(player, computer);
