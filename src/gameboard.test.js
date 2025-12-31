const Gameboard = require('./gameboard');

const myGameBoard = new Gameboard();

test ('Are there ships remaining?', () => {

    myGameBoard.placeShip(3, 3, 3, 'ver');

    expect(myGameBoard.shipsRemaining()).toBe(1);

    myGameBoard.receiveAttack(3, 3);
    myGameBoard.receiveAttack(3, 4);
    myGameBoard.receiveAttack(3, 5);

    expect(myGameBoard.shipsRemaining()).toBe('All ships down!');

})