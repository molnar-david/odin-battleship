const Gameboard = require('./Gameboard');

class Player {
    #name;
    #gameboard = new Gameboard();

    constructor(name = 'Computer') {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    get gameboard() {
        return this.#gameboard;
    }
}

module.exports = Player;
