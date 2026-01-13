let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');

function drawCurrentBoard(player, map, myFunc) {

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

function drawOppBoard(player, map, myFunc) {

  let sunkCoords = player.gameBoard.sunkCoords();

  for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {
        
      let div = document.createElement('div');

      if (player.gameBoard.board[i][j] == '⛴') {
        div.textContent = '∼';
      } else {
        div.textContent = player.gameBoard.board[i][j];
      }

      div.onclick = () => {

        player.gameBoard.receiveAttack([j],[i]);

        myFunc()

      };

      if (sunkCoords.includes(`${j}, ${i}`)) {
        div.style.color = 'red';
      }

      map.appendChild(div);

    }

  }

  console.log(player);
  console.log(player.gameBoard.ships);
  console.log(sunkCoords);


};

function removeBoard(map) {

  while (map.lastElementChild) {

    map.removeChild(map.lastElementChild);

  }

};

function refreshBoard(player1, player2, myFunc) {

  removeBoard(map1);
  removeBoard(map2);

  drawCurrentBoard(player1, player1.map, myFunc);
  drawOppBoard(player2, player2.map, myFunc);

};

module.exports = refreshBoard;