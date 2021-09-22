const supertest = require('supertest');
const { start } = require('../../index');

const api = supertest(start);

describe('POST /login', () => {
    describe('Give a email and password', () => {
        test('should res 200 status', async () => {
            const res = await api.post('/login').send({ email: "trungpham123@gmail.com", password: "Trungpham@123" });
            expect(res.statusCode).toBe(200);
        });
    });
});
