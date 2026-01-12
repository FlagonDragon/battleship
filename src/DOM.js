const { player1, player2 } = require('./player');

const instruction = document.getElementById('instruction');
const restartBtn = document.getElementById('restartBtn');
const upperCoords1 = document.getElementById("upperCoords1");
const upperCoords2 = document.getElementById("upperCoords2");
const leftCoords1 = document.getElementById("leftCoords1");
const leftCoords2 = document.getElementById("leftCoords2");
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");

instruction.textContent = 'Placeholder';
player1Name.textContent = player1.name;
player2Name.textContent = player2.name;

function appendCoords(myDiv) {

  for (let i = 0; i <= 9; i++) {
    let div = document.createElement('div');
    div.textContent = i;
    myDiv.appendChild(div);
  }

};

appendCoords(upperCoords1);
appendCoords(upperCoords2);
appendCoords(leftCoords1);
appendCoords(leftCoords2);

function refreshDOM(gameState, currentPlayer) {

  if (gameState == 'setup') {

    instruction.textContent = 'Marshal your fleet';

    restartBtn.style.background =  '#f5f5f5';
    restartBtn.style.color =  'black';
    restartBtn.style.fontWeight = 'regular';



  }

  if (gameState == 'live') {    

    instruction.textContent = `Your move, ${currentPlayer.name}.`;

  }

  if (gameState == 'over') {

    instruction.textContent = `${currentPlayer.name} wins!!!`;

    restartBtn.style.background =  'linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)';
    restartBtn.style.color = 'white';
    restartBtn.style.fontWeight = 'bold';


  }

};

module.exports = refreshDOM;