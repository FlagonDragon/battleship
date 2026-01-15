let { Gameboard } = require('./gameboard');

let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');

class Player {

    constructor(name = 'Admiral', num = 1) {
        this.name = name;
        this.num = num;
        this.gameBoard = new Gameboard;
        this.map;
        if (this.num == 1) this.map = map1;
        if (this.num == 2) this.map = map2;
    }

}

class Computer extends Player {

    constructor(name = 'Computer', num = 2) {
        super(name)
        this.num = num;
        this.gameBoard = new Gameboard;
        this.map = map2;
        this.lastHit = '';
    }

    makeMove(player) {

        let x = '';
        let y = '';

        if (this.lastHit != '') {

            if (player.gameBoard.board[this.lastHit.y][this.lastHit.x] == '✸') {
               
                let coords = this.getAdjacent(this.lastHit.x, this.lastHit.y, player);                

                x = coords.x;
                y = coords.y;

            } else {
                x = Math.round(Math.random() * 9);
                y = Math.round(Math.random() * 9);
            }

        } else {
            x = Math.round(Math.random() * 9);
            y = Math.round(Math.random() * 9);            
        }

        try {

            if (player.gameBoard.board[y][x] == '✸' || player.gameBoard.board[y][x] == '⛶') {                
                throw Error('Try other square!');
            }

            player.gameBoard.receiveAttack(x, y);

            this.lastHit = {x: x, y: y};

        } catch {  

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

    getAdjacent(x, y, player) {

        let adjacentCoords = [];

        adjacentCoords.push([x, y-1], [x+1, y], [x, y+1], [x-1, y]);

        adjacentCoords.forEach(coords => {

            if (coords[0] > 9 || coords[0] < 0 || coords[1] > 9 || coords[1] < 0) {
                
                adjacentCoords[adjacentCoords.indexOf(coords)] = adjacentCoords[adjacentCoords.length - 1];

                adjacentCoords.pop();

            }
            
        });
        
        let availableSquares = 0;

        adjacentCoords.forEach(coords => {

            if (player.gameBoard.board[coords[1]][coords[0]] == '∼' || player.gameBoard.board[coords[1]][coords[0]] == '⛴') {
                // console.log('available square: '+coords+' ('+player.gameBoard.board[coords[1]][coords[0]]+')');
                availableSquares++;
            }
            
        });

        if (availableSquares == 0) {
            return {x: Math.round(Math.random() * 9), y: Math.round(Math.random() * 9)};
        }

        let index = adjacentCoords[Math.round(Math.random() * (adjacentCoords.length-1))];        

        return {x: index[0], y: index[1]};

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