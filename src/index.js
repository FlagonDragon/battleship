import './styles.css';
import Ship from "./ship";
import Gameboard from "./gameboard";
const {Player, Computer} = require('./player');

const player1 = new Player;
const player2 = new Computer();

console.log('YAHOO!!!');

const window1 = document.getElementById("window1");
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");

player1Name.textContent = player1.name;
player2Name.textContent = player2.name;

player1.gameBoard.placeShip(3, 3, 3, 'ver');
player1.gameBoard.placeShip(5, 7, 4, 'hor');
player1.gameBoard.receiveAttack(6, 7)


let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');


for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {

        console.log(i+', '+j);
        
        let div = document.createElement('div');
        div.textContent = player1.gameBoard.board[i][j];
        map1.appendChild(div);

    }

}

for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {

        console.log(i+', '+j);
        
        let div = document.createElement('div');
        div.textContent = player2.gameBoard.board[i][j];
        map2.appendChild(div);

    }

}

console.log(player1.gameBoard.board);

