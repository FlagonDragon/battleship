const { gameState } = require("./gameboard");

let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');

function drawCurrentBoard(player, map) {

  let sunkCoords = player.gameBoard.sunkCoords();

  for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {
        
      let div = document.createElement('div');

      div.textContent = player.gameBoard.board[i][j];

      if (sunkCoords.includes(`${j}, ${i}`)) {
        div.style.color = 'red';
      }

      map.appendChild(div);

    }

  }

};

function drawOppBoard(player, map, myFunc, gameState) {

  let sunkCoords = player.gameBoard.sunkCoords();

  for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {
        
      let div = document.createElement('div');

      if (player.gameBoard.board[i][j] == '⛴') {
        div.textContent = '∼';
      } else {
        div.textContent = player.gameBoard.board[i][j];
      }

      if (gameState != 'over' && gameState != 'pass') {

        div.onclick = () => {

          let currValue = player.gameBoard.board[i][j];

          player.gameBoard.receiveAttack([j],[i]);

          if (player.gameBoard.board[i][j] != currValue) {

            if (player.name == `Player ${player.num}`) {
            //  means gamemode is multi
          
              myFunc('pass');
              removeBoard(map)
              drawOppBoard(player, map, myFunc, gameState)

            } else {

              myFunc();

            }

          }

        };

      }

      if (sunkCoords.includes(`${j}, ${i}`)) {
        div.style.color = 'red';
      }

      map.appendChild(div);

    }

  }

};

function removeBoard(map) {

  while (map.lastElementChild) {

    map.removeChild(map.lastElementChild);

  }

};

function refreshBoard(player1, player2, myFunc, gameState) {

  removeBoard(map1);
  removeBoard(map2);

  if (gameState == 'pass') {
    drawOppBoard(player1, player1.map, myFunc, gameState);
    drawOppBoard(player2, player2.map, myFunc, gameState);
    return;
  }

  drawCurrentBoard(player1, player1.map);
  drawOppBoard(player2, player2.map, myFunc, gameState);

};

module.exports = refreshBoard;