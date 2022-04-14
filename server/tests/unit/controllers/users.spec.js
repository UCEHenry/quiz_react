const usersController = require('../../../controllers/users')
const User = require('../../../models/user');

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
            await usersController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1', 'user2']);
        })
    });

    describe('show', () => {
        test('it returns an user and their habits with a 200 status code', async () => {
            jest.spyOn(User, 'findById')
                .mockResolvedValue(new User({id: 1, userName: 'Test User'} ));
            jest.spyOn(User.prototype, 'habits', 'get')
                .mockResolvedValue(['habit1', 'habit2']);
                
            const mockReq = { params: { id: 1 } }
            await usersController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                id: 1,  
                habits: ['habit1', 'habit2']
            });
        })
    });
    
})
