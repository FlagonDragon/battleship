const instruction = document.getElementById('instruction');
const restartBtn = document.getElementById('restartBtn');
const upperCoords1 = document.getElementById("upperCoords1");
const upperCoords2 = document.getElementById("upperCoords2");
const leftCoords1 = document.getElementById("leftCoords1");
const leftCoords2 = document.getElementById("leftCoords2");
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");

instruction.textContent = 'Placeholder';

let passBtn = document.createElement('button');

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

let windowListener = false;

function refreshDOM(gameState, gameMode, currentPlayer, myFunc) {

  if (gameMode == 'single') {
    player1Name.textContent = 'Admiral';
    player2Name.textContent = 'Computer';
  } else if (gameMode == 'multi') {
    player1Name.textContent = 'Player 1';
    player2Name.textContent = 'Player 2';
  }

  if (gameState == 'setup') {

    instruction.textContent = 'Marshal your fleet.';

    restartBtn.style.background =  '#f5f5f5';
    restartBtn.style.color =  'black';
    restartBtn.style.fontWeight = 'regular';

  }

  if (gameState == 'live') {    

    instruction.textContent = `Your move, ${currentPlayer.name}.`;

  }

  if (gameState == 'pass1') {

    instruction.textContent = '';
    passBtn.textContent = 'Pass turn'
    instruction.appendChild(passBtn);

    passBtn.onclick = () => {

      passBtn.textContent = 'Play';

      myFunc('pass2');

      passBtn.onclick = () => {

        passBtn.textContent = '';
        passBtn.remove();
        myFunc('live');

      };

    };

    if (windowListener == false) {

      window.addEventListener('keydown', () => {

        if (passBtn.textContent == 'Pass turn') {

          passBtn.textContent = 'Play';

          myFunc('pass2');

          passBtn.onclick = () => {

            passBtn.remove();
            myFunc('live');

          };

        } else if (passBtn.textContent == 'Play') {
          
          passBtn.textContent = '';
          passBtn.remove();
          myFunc('live');

        }

      });

      windowListener = true;

    }

  }

  if (gameState == 'over') {

    instruction.textContent = `${currentPlayer.name} wins!!!`;

    restartBtn.style.background =  'linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)';
    restartBtn.style.color = 'white';
    restartBtn.style.fontWeight = 'bold';


  }

};

module.exports = refreshDOM;