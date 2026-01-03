const {Player, Computer} = require('./player');

test('Create individual gameboards', () => {

    const player1 = new Player;
    const computer1 = new Computer;

    player1.playerBoard.placeShip(3, 3, 3, 'ver');
    computer1.computerBoard.placeShip(5, 5, 4, 'hor');

    player1.playerBoard.receiveAttack(3, 4);
    player1.playerBoard.receiveAttack(3, 5);

    expect(player1.playerBoard.ships[0].hits).toBe(2);
    expect(computer1.computerBoard.ships[0].hits).toBe(0);
    expect(player1.playerBoard.board[3][3]).toBe('S');
    expect(computer1.computerBoard.board[3][3]).toBe('O');

})