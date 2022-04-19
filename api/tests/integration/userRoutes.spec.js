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
        expect(res.body.length).toEqual(2);
    })
    
    it('should return a specific user with their score', async () => {
        const res = await request(api).get('/users/Goku');
        expect(res.statusCode).toEqual(200);
        expect(res.body.books.length).toEqual(2);
    }) 

    it('should create a new user', async () => {
        const res = await request(api)
            .post('/users')
            .send({
                username: 'Vegeta',
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("username");

        const authRes = await request(api).get('/users/Vegeta');
        expect(authRes.body.books.length).toEqual(3);
    });

    it('Should update an existing user score', async () => {
        const res = await request(api)
            .patch('/Goku')
            .send({
                score: 9000
            })
        expect(res.statusCode).toEqual(200);
        const userRes = await request(api).get('/users/Goku');
        expect(userRes.statusCode).toEqual(200);
    });
})