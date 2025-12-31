class Ship {

    constructor(num, length, coords = [], hits = 0, sunk = false) {
        this.num = num;
        this.length = length;
        this.coords = coords;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits += 1;
        this.isSunk();
    }

    isSunk() {
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }

};

module.exports = Ship;