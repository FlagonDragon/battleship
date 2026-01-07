import './styles.css';
import Ship from "./ship";
import Gameboard from "./gameboard";
const {Player, Computer} = require('./player');

let player1 = new Player;
let player2 = new Computer;

console.log('YAHOO!!!');

const container = document.getElementById("container");
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");

player1Name.textContent = player1.name;
player2Name.textContent = player2.name;

player1.gameBoard.placeShip(3, 3, 1, 'ver');
// player1.gameBoard.placeShip(5, 7, 4, 'hor');
player1.gameBoard.receiveAttack(6, 7)
player1.gameBoard.receiveAttack(0, 0)

player2.gameBoard.placeShip(2, 2, 2, 'hor');

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

        play();

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

let currentPlayer = player2;
let otherPlayer = player1;

const gameStates = ['setup','live','over'];
let gameState = gameStates[1];

function play() {

  if (gameState == 'setup') {
    player1 = new Player;
    player2 = new Computer;
    instruction.textContent = 'Pls place you\'re ships right meow.';
  }

  if (gameState == 'live') {

    console.log('umm yea we live');
    
    if (otherPlayer.gameBoard.shipsRemaining() == 0) {
      gameState = 'over';
      return play();
    }

    let newCurrentPlayer = otherPlayer;
    otherPlayer = currentPlayer;
    currentPlayer = newCurrentPlayer;
    
    instruction.textContent = `Your move, ${currentPlayer.name}.`;
  
    if (currentPlayer.name == 'Computer') {

      setTimeout(function() {
        console.log(currentPlayer.name);
        
        currentPlayer.makeMove(otherPlayer);
        play();
      }, 2000)

    }

  };
  

  if (gameState == 'over') {

    instruction.textContent = `${currentPlayer.name} wins!!!`;

  }

  refreshBoard();

}

// console.log(player1.gameBoard.receiveAttack(0, 0));

const restart = document.getElementById('restart');

restart.onclick = () => {

  player1 = new Player;
  player2 = new Computer;

  currentPlayer = player2;
  otherPlayer = player1;

  player1.gameBoard.placeShip(3, 3, 3, 'ver');
  player1.gameBoard.placeShip(5, 7, 4, 'hor');
  player2.gameBoard.placeShip(2, 2, 2, 'hor');
  
  gameState = 'live';
  console.log(gameState);
  
  play();

};

player2Name.onclick = () => {
  player2.makeMove(player1);
  refreshBoard();
}
play();