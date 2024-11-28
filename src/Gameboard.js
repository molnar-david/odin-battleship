const Ship = require('./Ship');

class Gameboard {
    #board;
    #ships;
    #areAllShipsSunk;

    constructor(board = Array(10).fill().map(() => Array(10).fill()), ships = [], areAllShipsSunk = false) {
        this.#board = board;
        this.#ships = ships;
        this.#areAllShipsSunk = areAllShipsSunk;
    }

    get board() {
        return this.#board;
    }

    get ships() {
        return this.#ships;
    }

    get areAllShipsSunk() {
        return this.#areAllShipsSunk;
    }
    
    placeShip(x, y, shipLength, isHorizontal = true) {
        if (!shipLength) return [];
        let coords = [];
        if (isHorizontal) {
            if (x + shipLength <= 10) {
                const clone = this.clone();
                const ship = new Ship(shipLength);
                for (let i = 0; i < shipLength; i++) {
                    if (typeof clone.board[x+i][y] === 'object') return [];
                    clone.board[x+i][y] = ship;
                    coords.push([x + i, y]);
                }
                for (let i = 0; i < shipLength; i++) {
                    this.#board[x+i][y] = ship;
                }
                this.#ships.push(ship);
            }
        } else {
            if (y + shipLength <= 10) {
                const clone = this.clone();
                const ship = new Ship(shipLength);
                for (let i = 0; i < shipLength; i++) {
                    if (typeof clone.board[x][y+i] === 'object') return [];
                    clone.board[x][y+i] = ship;
                    coords.push([x, y+i]);
                }
                for (let i = 0; i < shipLength; i++) {
                    this.#board[x][y+i] = ship;
                }
                this.#ships.push(ship);
            }
        }
        return coords;
    }

    receiveAttack(x, y) {
        if (typeof this.#board[x][y] === 'object') {
            this.#board[x][y].hit();
            if (this.#ships.every((ship) => ship.isSunk)) this.#areAllShipsSunk = true;
        } else this.#board[x][y] = 'x';
    }

    clone() {
        const newBoard = structuredClone(this.#board);
        const newShips = this.#ships.slice();
        return new Gameboard(newBoard, newShips, this.#areAllShipsSunk);
    }
}

module.exports = Gameboard;
