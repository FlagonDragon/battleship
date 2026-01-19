let { Player, Computer } = require('./player');
const refreshBoard = require('./refreshBoard');
const refreshDOM = require('./DOM');

let player1;
let player2;

let currentPlayer;
let otherPlayer;
let setupPlayer;

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
    // player1.gameBoard.placeShip(4,0,5,'v');

    // player2.gameBoard.placeShip(0,0,1,'v');


    currentPlayer = player2;
    otherPlayer = player1;
    setupPlayer = player1;

    dragDrop(setupPlayer);
    
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
        
      }, 1000)

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

function getSquares(player) {

  let squares; 

  console.log(gameMode);
  console.log(player);

  if (gameMode == 'single') {

    squares = document.getElementsByClassName('sqr2');

  } else if (gameMode == 'multi') {

    if (player == player1) {
      squares = document.getElementsByClassName('sqr1');
    } else if (player == player2) {
      squares = document.getElementsByClassName('sqr2');
    }

  }
  
  console.log(squares);
  
  return squares;

};

const restartBtn = document.getElementById('restartBtn');

const setup1 = document.getElementById('setup1');
const setup2 = document.getElementById('setup2');

const setupBtn1 = document.getElementById('setupBtn1');const setupBtn2 = document.getElementById('setupBtn2');
const setupBtns = document.getElementsByClassName('setupBtn');

const info = document.getElementById("info1");
let addShipBtn = document.createElement('button');
addShipBtn.textContent = 'Add ship';
info.appendChild(addShipBtn);

let shipIcons = document.querySelectorAll('.shipIcon');

let selected;

let mySetupBtn;

function dragDrop(player) {

  if (player == player1) mySetupBtn = setupBtn1;
  if (player == player2) mySetupBtn = setupBtn2;

  console.log(player);
  

  for (let shipIcon of shipIcons) {

    shipIcon.addEventListener('dragstart', function(e) {

      selected = e.target;
      
      let squares = getSquares(player);

      for (let square of squares) {

        square.addEventListener('dragover', function(e) {
          e.preventDefault();
        });

        square.addEventListener('drop', function(e) {
          
          let getCoords = square.classList[0].split('');  
          
          let length = selected.getAttribute('id')[8];        

          let orientation;

          if (mySetupBtn.textContent == 'Vertical') {
            orientation = 'v';
          } else if (mySetupBtn.textContent == 'Horizontal') {
            orientation = 'h';
          }       

          event.stopImmediatePropagation();

          try {
          
            player.gameBoard.placeShip(Number(getCoords[3]),Number(getCoords[2]), Number(length), orientation);

            selected.style.display = 'none';
            selected = null;

            event.stopImmediatePropagation();
            
            player.gameBoard.ships[player.gameBoard.ships.length - 1].coords.forEach(coord => {

              let splitCoords = coord.split(', ');

              let sqr = document.querySelector(`.sq${splitCoords[1]+splitCoords[0]+player.num}`);
          
              sqr.textContent = '⛴'
              
            });

            if (player.gameBoard.ships.length == 5) {
              mySetupBtn.textContent = 'Ready';
            }
            
          } catch {

            event.stopImmediatePropagation();

            alert('Unavailable square!');

            player.gameBoard.ships.pop();
            
          }
        
        });

      }

    });

  }

}

function restart() {

  for (let shipIcon of shipIcons) {
    shipIcon.style.display = 'block';
  }

  setupBtn.style.display = 'inline-block';
  setupBtn.textContent = 'Vertical';

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

for (let setupBtn of setupBtns) {

  setupBtn.onclick = () => {

    if (setupBtn.textContent == 'Vertical') {

      setupBtn.textContent = 'Horizontal';
      
    } else if (setupBtn.textContent == 'Horizontal') {

      setupBtn.textContent = 'Vertical';

    } else if (setupBtn.textContent == 'Ready' && player2.gameBoard.ships.length < 5) {

      setup1.style.display = 'none';

      setupBtn.textContent = 'Vertical';

      currentPlayer = player2;

      dragDrop(currentPlayer);

    } else if (setupBtn.textContent == 'Ready' && player2.gameBoard.ships.length == 5) {

      setupBtn.style.display = 'none';

      if (gameMode == 'single') {
        player2.populateBoard();
      }

      gameState = 'live';
      
      return play();

    }

  };

};

addShipBtn.onclick = () => {
  addShipDOM();
  refreshBoard(player1, player2, play, gameState);
  console.log(player1.gameBoard.ships);
  
};

addShipBtn.style.display = 'none';


module.exports = play;