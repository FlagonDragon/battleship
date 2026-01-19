const { gameState } = require("./gameboard");
const play = require("./logic");

let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');

function drawCurrentBoard(player, map) {

  let sunkCoords = player.gameBoard.sunkCoords();

  for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {
        
      let div = document.createElement('div');

      div.classList.add(`sq${i}${j}${player.num}`);
      div.classList.add(`sqr2`);

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

      div.classList.add(`sq${i}${j}${player.num}`);
      div.classList.add(`sqr1`);

      if (player.gameBoard.board[i][j] == '⛴') {
        div.textContent = '∼';
      } else {
        div.textContent = player.gameBoard.board[i][j];
      }

      if (gameState == 'live') {

        div.onclick = () => {

          let currValue = player.gameBoard.board[i][j];

          player.gameBoard.receiveAttack([j],[i]);

          if (player.gameBoard.board[i][j] != currValue) {

            let className = div.classList[0];

            player.lastDiv = className;  
            
            if (player.name == `Player ${player.num}`) {
            //  means gamemode is multi
          
              myFunc('pass1');

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

function lastSquare(player1, player2) {

 if(player1.lastDiv != '') {
    let lastDiv = document.querySelector(`.${player1.lastDiv}`);
    lastDiv.style.backgroundColor = 'greenyellow';    
  }

  if(player2.lastDiv != '') {
    let lastDiv = document.querySelector(`.${player2.lastDiv}`);
    lastDiv.style.backgroundColor = 'greenyellow';    
  }

}

function refreshBoard(player1, player2, myFunc, gameState) {

  if (gameState == 'dragDrop') {
    removeBoard(map1);
    drawOppBoard(player1, player1.map, myFunc, gameState);
    return;
  }

  removeBoard(map1);
  removeBoard(map2);

  if (gameState == 'pass2') {
    drawOppBoard(player1, player1.map, myFunc, gameState);
    drawOppBoard(player2, player2.map, myFunc, gameState);
    lastSquare(player1, player2);
    return;
  }

  drawCurrentBoard(player1, player1.map);
  drawOppBoard(player2, player2.map, myFunc, gameState);

  lastSquare(player1, player2);

};

module.exports = refreshBoard;