describe('user endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should return a list of all users in database', async () => {
        const res = await request(api).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    })
    
    it('should return a specific user with their score', async () => {
        const res = await request(api).get('/users/Goku');
        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual('Goku');
        expect(res.body.score).toEqual(10);
    }) 

    it('should create a new user', async () => {
        const res = await request(api)
            .post('/users')
            .send({
                username: 'Vegeta',
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");

        const userRes = await request(api).get('/users/Vegeta');
        expect(userRes.body.username).toEqual('Vegeta');
    });

    it('Should update an existing user score', async () => {
        const res = await request(api)
            .patch('/users')
            .send({
                username: "Goku",
                score: 9000
            })
        expect(res.statusCode).toEqual(200);
        const userRes = await request(api).get('/users/Goku');
        expect(userRes.statusCode).toEqual(200);
        expect(userRes.body.score).toEqual(9000);
    });
    
    it('should return a descending list of top ten users in database ny score', async () => {
        const res = await request(api).get('/topten');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    });
})