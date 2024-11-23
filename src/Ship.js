class Ship {
    #length;
    #hits = 0;
    #isSunk = false;

    constructor(length) {
        this.#length = length;
    }

    get length() {
        return this.#length;
    }

    get hits() {
        return this.#hits;
    }

    get isSunk() {
        return this.#isSunk;
    }

    hit() {
        this.#hits++;
        if (this.#hits >= this.#length) this.#isSunk = true;
    }
}

module.exports = Ship;
