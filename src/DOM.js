const { player1, player2 } = require('./player');

const instruction = document.getElementById('instruction');
const restartBtn = document.getElementById('restartBtn');
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");

instruction.textContent = 'Placeholder';
player1Name.textContent = player1.name;
player2Name.textContent = player2.name;

function refreshDOM(gameState, currentPlayer) {

  if (gameState == 'setup') {

    instruction.textContent = 'Pls place you\'re ships right meow.';

    restartBtn.style.backgroundColor =  'whitesmoke';
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