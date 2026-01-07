import './styles.css';
import Ship from "./ship";
import Gameboard from "./gameboard";
const {Player, Computer} = require('./player');

let player1 = new Player;
let player2 = new Computer;

console.log('YAHOO!!!');

const window1 = document.getElementById("window1");
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");

player1Name.textContent = player1.name;
player2Name.textContent = player2.name;

player1.gameBoard.placeShip(3, 3, 3, 'ver');
player1.gameBoard.placeShip(5, 7, 4, 'hor');
player1.gameBoard.receiveAttack(6, 7)

player2.gameBoard.placeShip(2, 2, 4, 'hor');
player2.makeMove(player1);


let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');

function drawBoard(player, map) {

  for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {
        
      let div = document.createElement('div');
      div.textContent = player.gameBoard.board[i][j];
      div.onclick = () => {
        player.gameBoard.receiveAttack([j],[i])
        console.log(j+', '+i);
        
        refreshBoard();

        console.log(player);
        
      };
      map.appendChild(div);

    }

  }

};

function removeBoard(map) {

  while (map.lastElementChild) {

    map.removeChild(map.lastElementChild);

  }

};

function refreshBoard() {

  removeBoard(map1);
  removeBoard(map2);

  drawBoard(player1, map1);
  drawBoard(player2, map2);

};

refreshBoard();

const instruction = document.getElementById('instruction');
instruction.textContent = 'Commence the games.'

let currentPlayer = player1;
let otherPlayer = player2;

const gameStates = ['setup','live','over'];
let gameState = gameStates[1];

function play() {

  if (gameState == 'setup') {
    player1 = new Player;
    player2 = new Computer;
    instruction.textContent = 'Pls place you\'re ships right meow.';
  }

  if (gameState == 'live') {
    
    instruction.textContent = `Come onnn ${currentPlayer.name}, attack, attack!!!`;
  
    if (otherPlayer.gameBoard.shipsRemaining() == 0) {
      gameState = 'over';
    }

  };
  

  if (gameState == 'over') {
    instruction.textContent = `S${currentPlayer.name} wins!!!`;
  }

  refreshBoard();

}

play();



