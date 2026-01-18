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

    // player1.gameBoard.placeShip(0,0,1,'v');
    // player1.gameBoard.placeShip(1,0,2,'v');
    // player1.gameBoard.placeShip(2,0,3,'v');
    // player1.gameBoard.placeShip(3,0,4,'v');
    // player1.gameBoard.placeShip(4,0,5,'v');

    player2.gameBoard.placeShip(0,0,1,'v');


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

  } else if (gameState == 'pass1') {

    if (otherPlayer.gameBoard.shipsRemaining() == 0) {      

      gameState = 'over';

      return play('over');

    }

  } 

  if (gameMode == 'single') {
    refreshBoard(player1, player2, play, gameState);
  } else if (gameMode == 'multi') {
    refreshBoard(currentPlayer, otherPlayer, play, gameState);
  }  

  refreshDOM(gameState, gameMode, currentPlayer, play);
  
};

function getSquares() {
  let squares = document.getElementsByClassName('sqr1');
  return squares;
};

const restartBtn = document.getElementById('restartBtn');
const setupBtn = document.getElementById('setupBtn');


const info = document.getElementById("info1");
let addShipBtn = document.createElement('button');
addShipBtn.textContent = 'Add ship';
info.appendChild(addShipBtn);

let shipIcons = document.querySelectorAll('.shipIcon');

let selected;

for (let shipIcon of shipIcons) {

  shipIcon.addEventListener('dragstart', function(e) {

    selected = e.target;
    
    let squares = getSquares();

    for (let square of squares) {

      square.addEventListener('dragover', function(e) {
        e.preventDefault();
      });

      square.addEventListener('drop', function(e) {
        
        let getCoords = square.classList[0].split('');  
        
        let length = selected.getAttribute('id')[8];        

        let orientation;

        if (setupBtn.textContent == 'Vertical') {
          orientation = 'v';
        } else if (setupBtn.textContent == 'Horizontal') {
          orientation = 'h';
        }       

        event.stopImmediatePropagation();

        
        try {
        
          player1.gameBoard.placeShip(Number(getCoords[3]),Number(getCoords[2]), Number(length), orientation);

          selected.style.display = 'none';
          selected = null;

          event.stopImmediatePropagation();
          
          player1.gameBoard.ships[player1.gameBoard.ships.length - 1].coords.forEach(coord => {

            let splitCoords = coord.split(', ');
            
            let sqr = document.querySelector(`.sq${splitCoords[1]+splitCoords[0]}1`)

            sqr.textContent = '⛴'
            
          });
          
        } catch {

          event.stopImmediatePropagation();

          alert('Unavailable square!');

          player1.gameBoard.ships.pop();
          
        }
      
      });

    }

  });

}

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

    alert('Unavailable square!');

    player1.gameBoard.ships.pop();

    addShipDOM();

  }
  
};

restartBtn.onclick = () => {
  restart();
};

console.log(setupBtn.textContent);


setupBtn.onclick = () => {

  if (setupBtn.textContent == 'Vertical') {

    setupBtn.textContent = 'Horizontal';
    
  } else if (setupBtn.textContent == 'Horizontal') {

    setupBtn.textContent = 'Vertical';

  }

};


addShipBtn.onclick = () => {
  addShipDOM();
  refreshBoard(player1, player2, play, gameState);
  console.log(player1.gameBoard.ships);
  
};

module.exports = play;