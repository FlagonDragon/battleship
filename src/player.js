const Gameboard = require('./gameboard');

class Player {

    constructor(name = 'Player1', playerNum = 1) {
        this.name = name;
        this.playerNum = playerNum;
        this.gameBoard = new Gameboard;
    }

}

const player = new Player();

console.log(player);
console.log(player.gameBoard.placeShip(3, 3, 3));
console.log(player.gameBoard.board);
console.log(player.gameBoard.shipsRemaining());


module.exports = Player;