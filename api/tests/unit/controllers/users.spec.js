const usersController = require('../../../controllers/controller')
const User = require('../../../models/model');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns users with a 200 status code', async () => {
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(['user1', 'user2']);
            await usersController.getAll(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1', 'user2']);
        })
    });

    describe('show', () => {
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
    
})
