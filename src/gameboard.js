const Ship = require("./ship");

function createBoard() {

    let emptyBoard = [];
    let boardRow = []

    for (let x = 0; x <= 9; x++) {
        boardRow.push('∼');
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

                if (this.board[y][x+i] == '⛴') {
                    throw Error ('Invalid placement');  
                }

            }

            for (let i = 0; i < length; i++) {

                this.board[y][x+i] = '⛴'
                newShip.coords.push(`${x+i}, ${y}`);

            }

        }

        if (orientation == 'v') {

            if ((y+length) > 10) throw Error ('Invalid placement');

            for (let i = 0; i < length; i++) {

                if (this.board[y+i][x] == '⛴') {
                    throw Error ('Invalid placement');  
                }

            }

            for (let i = 0; i < length; i++) {
                
                this.board[y+i][x] = '⛴'
                newShip.coords.push(`${x}, ${y+i}`);

            }

        }

    }

    receiveAttack(x, y) {

        if (this.board[y][x] == '⛴') {

            this.board[y][x] = '✸'

            this.ships.forEach(ship => {
                
                if (ship.coords.includes(`${x}, ${y}`)) {                    

                    ship.hit();

                }

            });

        } else {
            
            if (this.board[y][x] != '✸' && this.board[y][x] != '⛶') {   

                this.board[y][x] = '⛶';

            }

        } 

    }

    shipsRemaining() {

        let shipsRemaining = 0;

        this.ships.forEach(ship => {
            
            if (!ship.sunk) shipsRemaining++

        });

        return shipsRemaining;

    }

    sunkCoords() {

        let sunkCoords = [];

        this.ships.forEach(ship => {

            if (ship.sunk) {

                ship.coords.forEach(coord => {
                    sunkCoords.push(coord);
                });

            }

        });

        return sunkCoords;
    }

};

const gameStates = ['setup','live','over'];
let gameState = gameStates[0];

module.exports = { Gameboard, gameState};
