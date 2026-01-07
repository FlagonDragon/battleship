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

    makeMove(player) {
        let x = Math.round(Math.random() * 9);
        let y = Math.round(Math.random() * 9);

        player.gameBoard.receiveAttack(x, y);
    }

}

module.exports = {Player, Computer};