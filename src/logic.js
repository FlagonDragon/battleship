let { Player, Computer } = require('./player');
const refreshBoard = require('./refreshBoard');
const refreshDOM = require('./DOM');

let player1;
let player2;

let currentPlayer;
let otherPlayer;

let gameState = 'setup';
let gameMode = 'multi';

function play(changeState) {

  if (changeState) {
    gameState = changeState;
  }

  if (gameState == 'setup') {

    if (gameMode == 'single') {
      player1 = new Player;
      player2 = new Computer;
    } else if (gameMode == 'multi') {
      player1 = new Player('Player 1', 1);
      player2 = new Player('Player 2', 2);
    }

    player1.gameBoard.placeShip(0,0,1,'v');
    player1.gameBoard.placeShip(1,0,2,'v');
    player1.gameBoard.placeShip(2,0,3,'v');
    player1.gameBoard.placeShip(3,0,4,'v');
    player1.gameBoard.placeShip(4,0,5,'v');

    player2.gameBoard.placeShip(0,0,1,'v');
    player2.gameBoard.placeShip(1,0,2,'v');
    player2.gameBoard.placeShip(2,0,3,'v');
    player2.gameBoard.placeShip(3,0,4,'v');
    player2.gameBoard.placeShip(4,0,5,'v');

    currentPlayer = player2;
    otherPlayer = player1;
    
  } else if (gameState == 'live') {

    if (otherPlayer.gameBoard.shipsRemaining() == 0) {

      gameState = 'over';

      return play();

    }

    let newCurrentPlayer = otherPlayer;
    otherPlayer = currentPlayer;
    currentPlayer = newCurrentPlayer;
  
    if (gameMode == 'single' && currentPlayer.name == 'Computer') {

      setTimeout(function() {

        currentPlayer.makeMove(otherPlayer);

        play();
        
      }, 100)

    }

    // if (gameMode == 'multi') {
    //   console.log(gameMode);
      
    //   gameState = 'pass';

    //   console.log(gameState);
      
    // }    

  } else if (gameState == 'over') {
    //
  } else if (gameState == 'pass1') {
    // gameState = 'live';
  }else if (gameState == 'pass2') {
    // gameState = 'live';
  }

  if (gameMode == 'single') {
    refreshBoard(player1, player2, play, gameState);
  } else if (gameMode == 'multi') {
    refreshBoard(currentPlayer, otherPlayer, play, gameState);
  }

  refreshDOM(gameState, gameMode, currentPlayer, play);

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

    if (gameMode == 'single') {
      player2.populateBoard();
    }

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
  refreshBoard(player1, player2, play, gameState);
};

module.exports = play;