const Ship = require('./ship');

const SSLinebeck = new Ship(1, 4);

test('Is ship sunk', () => {

    SSLinebeck.hit();
    SSLinebeck.hit();
    SSLinebeck.hit();
    SSLinebeck.hit();
    expect(SSLinebeck.hits).toEqual(SSLinebeck.length);
    expect(SSLinebeck.sunk).toBe(true);

});