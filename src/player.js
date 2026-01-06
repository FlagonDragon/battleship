let {Gameboard, createBoard} = require('./gameboard');

class Player {

    constructor(name = 'Player1', num = 1) {
        this.name = name;
        this.num = num;
        this.gameBoard = new Gameboard;
    }

}

const player = new Player();

class Computer extends Player {

    constructor(name = 'Computer1', num = 1) {
        super(name)
        this.num = num;
        this.gameBoard = new Gameboard;
    }

}

module.exports = {Player, Computer};