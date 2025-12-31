let {Gameboard, createBoard} = require('./gameboard');

class Player {

    constructor(name = 'Player1', playerNum = 1) {
        this.name = name;
        this.playerNum = playerNum;
        this.playerBoard = new Gameboard;
        // this.playerBoard.board = JSON.parse(JSON.stringify(createBoard()));
    }

}

const player = new Player();

console.log(player);
console.log(player.playerBoard);
player.playerBoard.placeShip(3, 3, 3, 'ver');
console.log(player.playerBoard.board[3][3]);
console.log(player.playerBoard.board);
// console.log(player.playerBoard.shipsRemaining());

// const myBoard = new Gameboard;

// myBoard.placeShip(3, 3, 3);
// console.log(myBoard.board);



module.exports = Player;