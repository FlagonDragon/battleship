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


// var mapBox = document.createElement('div');
// window1.appendChild(mapBox);

