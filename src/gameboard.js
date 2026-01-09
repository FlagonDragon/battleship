const Ship = require("./ship");

function createBoard() {

    let emptyBoard = [];
    let boardRow = []

    for (let x = 0; x <= 9; x++) {
        boardRow.push('O');
    };

    for (let y = 0; y <= 9; y++) {
        emptyBoard.push(boardRow.slice());
    };

    return emptyBoard;

}

class Gameboard {

    constructor() {
        this.board = JSON.parse(JSON.stringify(createBoard()));
        this.ships = [];
    }

    placeShip(x, y, length, orientation) {
        
        let newShip = new Ship(this.ships.length, length);

        this.ships.push(newShip);

        // console.log(x+''+y);
        
        if (orientation == 'h') {

            if ((x+length) > 10) {
                throw Error ('Invalid placement');
            }

            for (let i = 0; i < length; i++) {

                if (this.board[y][x+i] == 'S') {
                    throw Error ('Invalid placement');  
                }

            }

            for (let i = 0; i < length; i++) {

                this.board[y][x+i] = 'S'
                newShip.coords.push(`${x+i}, ${y}`);

            }

        }

        if (orientation == 'v') {

            if ((y+length) > 10) throw Error ('Invalid placement');

            for (let i = 0; i < length; i++) {

                if (this.board[y+i][x] == 'S') {
                    throw Error ('Invalid placement');  
                }

            }

            for (let i = 0; i < length; i++) {
                
                this.board[y+i][x] = 'S'
                newShip.coords.push(`${x}, ${y+i}`);

            }

        }

    }

    receiveAttack(x, y) {

        if (this.board[y][x] == 'X' || this.board[y][x] == 'M') { 
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

    shipsRemaining() {

        let shipsRemaining = 0;

        this.ships.forEach(ship => {
            
            if (!ship.sunk) shipsRemaining++

        });

        return shipsRemaining;

    }

};

module.exports = Gameboard;
