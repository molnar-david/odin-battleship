const Ship = require('./Ship');

test('ship got hit once', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('ship got hit three times', () => {
    const ship = new Ship(5);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
});

test('ship got hit and did not sink', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk).toBeFalsy();
});

test('ship got hit and sunk', () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk).toBeTruthy();
});
