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

    player2.gameBoard.placeShip(0,0,1,'v');
    player2.gameBoard.placeShip(1,0,2,'v');
    player2.gameBoard.placeShip(2,0,3,'v');
    player2.gameBoard.placeShip(3,0,4,'v');


    currentPlayer = player2;
    otherPlayer = player1;
    setupPlayer = player1;

    dragDrop();
        
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

function getSquares() {

  console.log(setupPlayer);
  

  let squares; 

  if (gameMode == 'single') {

    squares = document.getElementsByClassName('sqr2');

  } else if (gameMode == 'multi') {

    // console.log(gameMode);
    // console.log(player);

    if (setupPlayer == player1) {
    // console.log(gameMode);
    // console.log(player);
      squares = document.getElementsByClassName('sqr1');
    } else if (setupPlayer == player2) {
      squares = document.getElementsByClassName('sqr2');
    }

  }
  
  console.log(squares);
  
  return squares;

};

const restartBtn = document.getElementById('restartBtn');

const setup1 = document.getElementById('setup1');
const setup2 = document.getElementById('setup2');
setup2.style.display = 'none';

const setupBtn1 = document.getElementById('setupBtn1');const setupBtn2 = document.getElementById('setupBtn2');
const setupBtns = document.getElementsByClassName('setupBtn');

const info = document.getElementById("info1");
let addShipBtn = document.createElement('button');
addShipBtn.textContent = 'Add ship';
info.appendChild(addShipBtn);

let shipIcons = document.querySelectorAll('.shipIcon');

let selected;

let mySetupBtn;

function dragDrop() {

  if (setupPlayer == player1) mySetupBtn = setupBtn1;
  if (setupPlayer == player2) mySetupBtn = setupBtn2;  

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

          if (mySetupBtn.textContent == 'Vertical') {
            orientation = 'v';
          } else if (mySetupBtn.textContent == 'Horizontal') {
            orientation = 'h';
          }       

          event.stopImmediatePropagation();

          try {

          console.log(setupPlayer);
            
          
            setupPlayer.gameBoard.placeShip(Number(getCoords[3]),Number(getCoords[2]), Number(length), orientation);

            selected.style.display = 'none';
            selected = null;

            event.stopImmediatePropagation();
            
            setupPlayer.gameBoard.ships[setupPlayer.gameBoard.ships.length - 1].coords.forEach(coord => {

              let splitCoords = coord.split(', ');

              let sqr = document.querySelector(`.sq${splitCoords[1]+splitCoords[0]+setupPlayer.num}`);

              console.log(sqr);
              
          
              sqr.textContent = '⛴'
              
            });
            console.log(setupPlayer.gameBoard.ships.length );
            console.log(setupPlayer.gameBoard.ships.length == 5);
            
            
                
            if (setupPlayer.gameBoard.ships.length == 5) {
              mySetupBtn.textContent = 'Ready';
            }

            console.log(mySetupBtn.textContent);

            
          } catch {

            event.stopImmediatePropagation();

            alert('Unavailable square!');

            setupPlayer.gameBoard.ships.pop();
            
          }
        
        });

      }

    });

  }

};



function restart() {

  for (let shipIcon of shipIcons) {
    shipIcon.style.display = 'block';
  }

  setupBtn1.textContent = 'Vertical';
  setupBtn2.textContent = 'Vertical';
  setup1.style.display = 'block';
  setup2.style.display = 'none';

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
      setup2.style.display = 'block';
      setupBtn2.style.display = 'inline-block';

      setupBtn.textContent = 'Vertical';

      setupPlayer = player2;

      refreshBoard(player1, player2, play, 'dragDrop');
      
      dragDrop();

    } else if (setupBtn.textContent == 'Ready' && player2.gameBoard.ships.length == 5) {

      setupBtn.style.display = 'none';
      setup2.style.display = 'none';

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