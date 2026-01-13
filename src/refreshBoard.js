let map1 = document.getElementById('map1');
let map2 = document.getElementById('map2');

function drawCurrentBoard(player, map, myFunc) {

  // console.log(player);

  for (let i = 0; i <= 9; i++) {

    for (let j = 0; j <= 9; j++) {
        
      let div = document.createElement('div');

      div.textContent = player.gameBoard.board[i][j];

      map.appendChild(div);

    }

  }

};

function drawOppBoard(player, map, myFunc) {

  // console.log(player);

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

      map.appendChild(div);

    }

  }

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