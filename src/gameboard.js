const Ship = require("./ship");

let emptyBoard = [];
let boardRow = []

for (let x = 0; x <= 9; x++) {
    boardRow.push('O');
};

for (let y = 0; y <= 9; y++) {
    emptyBoard.push(boardRow.slice());
};

// console.log(emptyBoard);


class Gameboard {

    constructor() {
        this.board = JSON.parse(JSON.stringify(emptyBoard));
        this.ships = [];
    }

    placeShip(x, y, length, orientation) {
        
        let newShip = new Ship(this.ships.length, length);

        this.ships.push(newShip);
        
        if (orientation == 'hor') {

            if ((x+length) > 10) throw Error ('Invalid placement');

            for (let i = 0; i < length; i++) {
                
                this.board[y][x+i] = 'S'
                newShip.coords.push(`${x+i}, ${y}`);

            }

        }

        if (orientation == 'ver') {

            if ((y+length) > 10) throw Error ('Invalid placement');

            for (let i = 0; i < length; i++) {
                
                this.board[y+i][x] = 'S'
                newShip.coords.push(`${x}, ${y+i}`);

            }

        }

    }

    receiveAttack(x, y) {

        if (this.board[y][x] == 'X' && this.board[y][x] == 'M') { 
            throw Error('Repeated coordinate')
        }

        if (this.board[y][x] == 'S') {

            this.board[y][x] = 'X'

            this.ships.forEach(ship => {
                
                if (ship.coords.includes(`${x}, ${y}`)) {                    

                    ship.hit();

                }

            });

        } else {

            this.board[y][x] = 'M'

        } 

    }

};

myGameBoard = new Gameboard();

myGameBoard.placeShip(3, 3, 3, 'ver');
myGameBoard.placeShip(5, 5, 2, 'hor');

myGameBoard.placeShip(2, 6, 4, 'ver');

console.log(myGameBoard.board);

myGameBoard.receiveAttack(3, 4);

console.log(myGameBoard.ships);



module.exports = Gameboard;