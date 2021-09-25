/*global describe beforeAll test expect*/
/*eslint no-undef: "error"*/

const { api } = require('./common');

describe('POST /api/user', () => {
    let token = '';

    beforeAll( async () => {
        const { body: { data }} = await api.post('/api/login').send({ email: 'trungpham123@gmail.com', password: 'Trungpham@123' });
        token = data.token;
    });

    test('get user by token -> success: True', async () => {
        const { body: { success } } = await api.get('/api/user').set('Authorization', `${token}`);
        expect(success).toBe(true);
    });

    test('update user -> success: True', async () => {
        const { body: { success } } = await api.get('/api/user')
            .set('Authorization', `${token}`)
            .send({ name: 'trungpham123' });

        expect(success).toBe(true);
    });
});
