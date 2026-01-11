// const { player1, player2 } = require('./player');
// let { gameState } = require('./gameboard');
// const play = require('./logic');

// console.log(play);

// const restartBtn = document.getElementById('restartBtn');

// const info = document.getElementById("info1");
// let addShipBtn = document.createElement('button');
// addShipBtn.textContent = 'Add ship';
// info.appendChild(addShipBtn);

// function restart() {

//   gameState = 'setup';
  
//   play();

// };

// function addShipDOM() {
  
//   if (player1.gameBoard.ships.length == 4) {
//     addShipBtn.textContent = 'Ready';
//   }

//   if (player1.gameBoard.ships.length == 5) {
//     addShipBtn.remove();
//     player2.populateBoard();
//     gameState = 'live';
//     return play();
//   }

//   let answer = prompt('State XY coordinates and orientation (h or v) of ship. Separate with commas.');
  
//   let arr = answer.split(',');

//   try {

//     player1.gameBoard.placeShip(Number(arr[0]), Number(arr[1]), player1.gameBoard.ships.length+1, arr[2]);

//   } catch {

//     alert('Square already occupied!')

//     addShipDOM();

//   }
  
// };

// module.exports = { restartBtn, restart, addShipBtn, addShipDOM };