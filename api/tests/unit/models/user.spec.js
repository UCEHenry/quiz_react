const User = require('../../../models/model');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with authors on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('findByUser', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, username: 'Marco' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData] });
            const result = await User.findByUser("Marco");
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('create', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, username: 'Marco' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData] });
            const result = await User.createUser('Marco');
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('update', () => {
        test('it resolves user with updated score', async () => {
            let userData = { id:1,username: 'Goku', score: 10 }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData]});
            await User.findByUser('Goku');
            const updatedScore = await User.updateUserScore("Goku",21);
            expect(updatedScore).toBeInstanceOf(User);
            expect(updatedScore).toHaveProperty("score", 21);
        })
    });
})
