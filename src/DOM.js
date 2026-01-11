const { player1, player2 } = require('./player');

const instruction = document.getElementById('instruction');
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");

instruction.textContent = 'Placeholder';
player1Name.textContent = player1.name;
player2Name.textContent = player2.name;

function refreshDOM(gameState, currentPlayer) {

  console.log('huh???');
  console.log(gameState);
  

  if (gameState == 'setup') {

    instruction.textContent = 'Pls place you\'re ships right meow.';

  }

  if (gameState == 'live') {

    console.log('INSTRUCTION LIVE');
    

    instruction.textContent = `Your move, ${currentPlayer.name}.`;
    
  }

  if (gameState == 'over') {

    instruction.textContent = `${currentPlayer.name} wins!!!`;

  }

};

module.exports = refreshDOM;