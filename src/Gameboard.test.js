const Gameboard = require('./Gameboard');

let gameboard;

beforeEach(() => {
    gameboard = new Gameboard();
});

test('place ship in valid coordinates', () => {
    expect(gameboard.placeShip(2, 2, 3)).toEqual([[2, 2], [3, 2], [4, 2]]);
});

test('place ship in invalid coordinates', () => {
    expect(gameboard.placeShip(7, 7, 3)).toEqual([]);
});

describe('receive attack - single ship', () => {
    beforeEach(() => {
        gameboard.placeShip(2, 2, 3);
    })

    test('miss', () => {
        gameboard.receiveAttack(1, 2);
        expect(gameboard.board[1][2]).toBe('x');
    });

    test('single hit', () => {
        gameboard.receiveAttack(2, 2);
        expect(gameboard.board[2][2].hits).toBe(1);
    });

    describe('multiple hits', () =>  {
        beforeEach(() => {
            gameboard.receiveAttack(2, 2);
            gameboard.receiveAttack(3, 2);
        })

        test('hits recorded', () => {
            expect(gameboard.board[2][2].hits).toBe(2);
            expect(gameboard.board[3][2].hits).toBe(2);
        });

        test('ship did not sink', () => {
            expect(gameboard.areAllShipsSunk).toBeFalsy();
        });

        test('ship sunk', () => {
            gameboard.receiveAttack(4, 2);
            expect(gameboard.areAllShipsSunk).toBeTruthy();
        });
    });
});

describe('receive attack - multiple ships', () => {
    beforeEach(() => {
        gameboard.placeShip(2, 2, 3);
        gameboard.placeShip(2, 4, 2);
    })

    test('single hit', () => {
        gameboard.receiveAttack(2, 2);
        expect(gameboard.board[2][2].hits).toBe(1);
        expect(gameboard.board[2][4].hits).toBe(0);
    });

    test('multiple hits - same ship', () => {
        gameboard.receiveAttack(2, 2);
        gameboard.receiveAttack(3, 2);
        expect(gameboard.board[2][2].hits).toBe(2);
        expect(gameboard.board[3][2].hits).toBe(2);
        expect(gameboard.board[2][4].hits).toBe(0);
    });

    test('multiple hits - different ships', () => {
        gameboard.receiveAttack(2, 2);
        gameboard.receiveAttack(2, 4);
        expect(gameboard.board[2][2].hits).toBe(1);
        expect(gameboard.board[2][4].hits).toBe(1);
    });

    describe('sinking ships', () => {
        test('not all ships sunk', () => {
            gameboard.receiveAttack(2, 2);
            gameboard.receiveAttack(3, 2);
            gameboard.receiveAttack(4, 2);
            gameboard.receiveAttack(2, 4);
            expect(gameboard.areAllShipsSunk).toBeFalsy();
        });

        test('all ships sunk', () => {
            gameboard.receiveAttack(2, 2);
            gameboard.receiveAttack(3, 2);
            gameboard.receiveAttack(4, 2);
            gameboard.receiveAttack(2, 4);
            gameboard.receiveAttack(3, 4);
            expect(gameboard.areAllShipsSunk).toBeTruthy();
        });
    });
});

describe('cloning', () =>  {
    test('modifying clone does not modify original gameboard', () => {
        gameboard.placeShip(2, 2, 3);
        const clone = gameboard.clone();
        clone.placeShip(2, 4, 3);
        expect(gameboard.board[2][4]).toBeUndefined();
    });
});
