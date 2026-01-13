let { Gameboard } = require('./gameboard');

let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');

class Player {

    constructor(name = 'Admiral', num = 1) {
        this.name = name;
        this.num = num;
        this.gameBoard = new Gameboard;
        this.map = map1;
    }

}

const player = new Player();

class Computer extends Player {

    constructor(name = 'Computer', num = 1) {
        super(name)
        this.num = num;
        this.gameBoard = new Gameboard;
        this.map = map2;
        this.lastHit = '';
    }

    makeMove(player) {

        console.log(this.lastHit );  

        if (this.lastHit != '') {

            if (player.gameBoard.board[this.lastHit.y][this.lastHit.x] == '✸') {
                console.log('lasthit hit');
                console.log(this.getAdjacent(this.lastHit.x, this.lastHit.y));
            }

        }

        let x = Math.round(Math.random() * 9);
        let y = Math.round(Math.random() * 9);

        try {

            if (player.gameBoard.board[y][x] == '✸' || player.gameBoard.board[y][x] == '⛶') {
                throw Error('Try other square!');
            }

            player.gameBoard.receiveAttack(x, y);

            this.lastHit = {x: x, y: y};

        } catch {

            console.log('retrying');
            
            this.makeMove(player);
            
        }

        // console.log(this.getHitCoords(player));

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

    getHitCoords(player) {

        let hitCoords = [];

        player.gameBoard.ships.forEach(ship => {
            if (ship.hits > 0 && ship.sunk == false) {
                hitCoords.push(ship.coords);
            }
        });   
        
        return hitCoords;

    }

    getAdjacent(x, y) {

        let adjacentCoords = [];

        adjacentCoords.push([x, y-1],[x+1, y-1],[x+1, y], [x+1, y+1], [x, y+1], [x-1, y+1], [x-1, y], [x-1, y-1]);

        return adjacentCoords;

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