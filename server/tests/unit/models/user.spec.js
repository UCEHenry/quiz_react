const User = require('../../../models/user');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('habits', () => {
        test('it resolves with formatted habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ 
                    rows: [{id: 1, habit_name: 'habit1', habit_description: 'walking 30 min daily', habit_frequency: 'daily', frequency_target: 4, user_id: 1 }, {id: 2, habit_name: 'habit2', habit_description: 'walking 30 min daily', habit_frequency: 'daily', frequency_target: 4, user_id: 1}]
                });
            let testUser = new User({ id: 1, username: 'Test User', email: 'kakarrot@go.ku', password_digest: 'aafadnthpqbsbapbb784' })
            const habits = await testUser.habits;
            expect(habits).toHaveLength(2)
            // expect(habits[0]).toHaveProperty('user_id', 1)
    });
})
    // describe('destroy', () => {
    //     test('it resolves with message on successful db query', async () => {
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ id: 1 });
    //         let testAuthor = new Author({ id: 1, name: 'Test Author'})
    //         const result = await testAuthor.destroy();
    //         expect(result).toBe('Author 1 was deleted')
    //     })
    // });

    describe('findById', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, username: 'Test User' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData] });
            const result = await User.findById(1);
            expect(result).toBeInstanceOf(User)
        })
    });

    // describe('create', () => {
    //     test('it resolves with author on successful db query', async () => {
    //         let authorData = { id: 1, name: 'New Author' }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({rows: [ authorData] });
    //         const result = await Author.create('New Author');
    //         expect(result).toBeInstanceOf(Author)
    //     })
    // });

    // describe('findOrCreateByName', () => {
    //     test('it calls on Author.create if name not found', async () => {
    //         let authorData = { id: 1, name: 'New Author' }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({rows: [ ] });
    //         const createSpy = jest.spyOn(Author, 'create')
    //             .mockResolvedValueOnce(new Author(authorData));
    //         const result = await Author.findOrCreateByName('New Author');
    //         expect(createSpy).toHaveBeenCalled();
    //         expect(result).toBeInstanceOf(Author);
    //     })

    //     test('it does not call on Author.create if name found', async () => {
    //         let authorData = { id: 1, name: 'Old Author' }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({rows: [ authorData ] });
    //         const createSpy = jest.spyOn(Author, 'create')
    //             .mockResolvedValueOnce(new Author(authorData));
    //         const result = await Author.findOrCreateByName('Old Author');
    //         expect(createSpy).not.toHaveBeenCalled();
    //         expect(result).toBeInstanceOf(Author);
    //     })
    // });
    
})
