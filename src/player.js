let { Gameboard } = require('./gameboard');

class Player {

    constructor(name = 'Player', num = 1) {
        this.name = name;
        this.num = num;
        this.gameBoard = new Gameboard;
    }

}

const player = new Player();

class Computer extends Player {

    constructor(name = 'Computer', num = 1) {
        super(name)
        this.num = num;
        this.gameBoard = new Gameboard;
    }

    makeMove(player) {
        let x = Math.round(Math.random() * 9);
        let y = Math.round(Math.random() * 9);

        try {
            player.gameBoard.receiveAttack(x, y);
        } catch {
            console.log('retrying');
            
            this.makeMove(player);
        }

    }

    randomShip(length) {

        let orientation = Math.random()

        if (orientation > 0.5) {
            orientation = 'v';
        } else {
            orientation = 'h';
        }

        try {
            this.gameBoard.placeShip(Math.round(Math.random() * 9), Math.round(Math.random() * 9), length, orientation);
        } catch {
            this.gameBoard.ships.pop();
            this.randomShip(length);
        }

    }

    populateBoard() {

        this.randomShip(1);
        this.randomShip(2);
        this.randomShip(3);
        this.randomShip(4);
        this.randomShip(5);

    }

}

let player1 = new Player;
let player2 = new Computer;

let currentPlayer = player2;
let otherPlayer = player1;

module.exports = { Player, Computer, player1, player2, currentPlayer, otherPlayer };