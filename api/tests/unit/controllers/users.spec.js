const usersController = require('../../../controllers/controller')
const User = require('../../../models/model');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('all', () => {
        test('it returns users with a 200 status code', async () => {
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(['user1', 'user2']);
            await usersController.getAll(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1', 'user2']);
        })
    });

    describe('topTen', () => {
        test('it returns users with a 200 status code', async () => {
            jest.spyOn(User, 'usersTopTen', 'get')
                 .mockResolvedValue(['user1', 'user2']);
            await usersController.topTen(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1', 'user2']);
        })
    });

    describe('findByUser', () => {
        test('it returns an user with a 200 status code', async () => {
            jest.spyOn(User, 'findByUser')
                .mockResolvedValue(new User({ id: 1, username: 'Marco'} ));
                
            const mockReq = { params: { username: "Marco" } }
            await usersController.getUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                id : 1,
                username: 'Marco'
            });
        })
    });
    
    describe('create', () => {
        test('it returns a new user with a 201 status code', async () => {
            let testUser = {
                id: 2, username: 'Marco'
            }
            jest.spyOn(User, 'createUser')
                .mockResolvedValue(new User(testUser));
                
            const mockReq = { body: testUser }
            await usersController.createNewUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });

    describe('update', () => {
        test('it updates the score of the user with a 200 status code', async () => {
            let testUser = {
                id: 2, username: 'Marco', score: 12
            }
            jest.spyOn(User, 'updateUserScore')
                .mockResolvedValue(new User(testUser));
            
            const mockReq = { body: { score: 10, username: "Marco" } }
            await usersController.updateScore(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                score: 10
            });
        })
    })
})
