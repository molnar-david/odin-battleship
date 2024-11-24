const Ship = require('./Ship');

class Gameboard {
    #board = Array(10).fill().map(() => Array(10).fill());
    #ships = [];
    #areAllShipsSunk = false;

    get board() {
        return this.#board;
    }

    get ships() {
        return this.#ships;
    }

    get areAllShipsSunk() {
        return this.#areAllShipsSunk;
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
            if (this.#ships.every((ship) => ship.isSunk)) this.#areAllShipsSunk = true;
        } else this.#board[x][y] = 'x';
    }
}

module.exports = Gameboard;
