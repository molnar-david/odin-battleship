const Gameboard = require('./Gameboard');

class Player {
    #name;
    #gameboard;

    constructor(name = 'Computer', gameboard = new Gameboard()) {
        this.#name = name;
        this.#gameboard = gameboard;
    }

    get name() {
        return this.#name;
    }

    get gameboard() {
        return this.#gameboard;
    }

    clone() {
        return new Player(this.#name, this.#gameboard.clone());
    }
}

module.exports = Player;
