const Ship = require('./Ship');

const BOARD_SIZE = 10;

class Gameboard {
    #board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill());
    #ships = [];
    #allShipsSunk = false;

    get board() {
        return this.#board;
    }

    get ships() {
        return this.#ships;
    }

    get allShipsSunk() {
        return this.#allShipsSunk;
    }

    isValidPlacement(x, y, shipLength) {
        return (x + shipLength >= 10) ? false : true;
    }
    
    placeShip(x, y, shipLength) {
        let coords = [];
        if (this.isValidPlacement(x, y, shipLength)) {
            const ship = new Ship(shipLength);
            for (let i = 0; i < shipLength; i++) {
                this.#board[x+i][y] = ship;
                coords.push([x + i, y]);
            }
            this.#ships.push(ship);
        }
        return coords;
    }

    receiveAttack(x, y) {
        if (typeof this.#board[x][y] === 'object') {
            this.#board[x][y].hit();
            if (this.#ships.every((ship) => ship.isSunk)) this.#allShipsSunk = true;
        } else this.#board[x][y] = 'x';
    }
}

module.exports = Gameboard;
