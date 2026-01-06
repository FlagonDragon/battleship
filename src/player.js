let {Gameboard, createBoard} = require('./gameboard');

class Player {

    constructor(name = 'Player1', num = 1) {
        this.name = name;
        this.num = num;
        this.playerBoard = new Gameboard;
    }

}

const player = new Player();

class Computer extends Player {

    constructor(name = 'Computer1', num = 1) {
        super(name)
        this.num = num;
        this.computerBoard = new Gameboard;
    }

}

const pc = new Computer();

console.log(pc);
pc.computerBoard.placeShip(4, 4, 4, 'hor');
pc.computerBoard.receiveAttack(6, 4);
console.log(pc.computerBoard.board);


module.exports = {Player, Computer};