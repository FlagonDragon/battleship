let { Player, Computer, player1, player2, currentPlayer, otherPlayer } = require('./player');
let { gameState } = require('./gameboard');
const refreshBoard = require('./refreshBoard');
const refreshDOM = require('./DOM');

function play() {

  if (gameState == 'setup') {

    player1 = new Player;
    player2 = new Computer;

    player1.gameBoard.placeShip(0,0,1,'v');
    player1.gameBoard.placeShip(1,0,2,'v');
    player1.gameBoard.placeShip(2,0,3,'v');
    player1.gameBoard.placeShip(3,0,4,'v');
    player1.gameBoard.placeShip(4,0,5,'v');

    currentPlayer = player2;
    otherPlayer = player1;

  }

  if (gameState == 'live') {


    // restartBtn.style.backgroundColor = "purple";

    if (otherPlayer.gameBoard.shipsRemaining() == 0) {

      gameState = 'over';

      return play();

    }

    let newCurrentPlayer = otherPlayer;
    otherPlayer = currentPlayer;
    currentPlayer = newCurrentPlayer;
  
    if (currentPlayer.name == 'Computer') {

      setTimeout(function() {

        currentPlayer.makeMove(otherPlayer);

        play();
        
      }, 100)

    }

  }
  
  if (gameState == 'over') {
    restartBtn.style.backgroundColor = "black";
  }  

  refreshBoard(player1, player2, play);
  refreshDOM(gameState, currentPlayer);

};

const restartBtn = document.getElementById('restartBtn');

const info = document.getElementById("info1");
let addShipBtn = document.createElement('button');
addShipBtn.textContent = 'Add ship';
info.appendChild(addShipBtn);

function restart() {

  addShipBtn.style.display = 'inline-block'

  gameState = 'setup';
  
  play();

};

function addShipDOM() {
  
  if (player1.gameBoard.ships.length == 4) {
    addShipBtn.textContent = 'Ready';
  }

  if (player1.gameBoard.ships.length == 5) {
    addShipBtn.style.display = 'none';
    player2.populateBoard();
    gameState = 'live';
    
    return play();
  }

  let answer = prompt('State XY coordinates and orientation (h or v) of ship. Separate with commas.');
  
  let arr = answer.split(',');

  try {

    player1.gameBoard.placeShip(Number(arr[0]), Number(arr[1]), player1.gameBoard.ships.length+1, arr[2]);

  } catch {

    alert('Unavailable square!')

    player1.gameBoard.ships.pop();

    addShipDOM();

  }
  
};

restartBtn.onclick = () => {
  restart();
};

addShipBtn.onclick = () => {
  addShipDOM();
  refreshBoard(player1, player2, play);
};

module.exports = play;