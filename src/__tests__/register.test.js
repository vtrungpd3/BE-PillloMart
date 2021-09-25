/*global describe beforeEach test expect*/
/*eslint no-undef: "error"*/

const { api, mongo } = require('./common');

describe('POST /api/register', () => {
    beforeEach(() => {
        mongo();
    });

    test('create user -> success: True', async () => {
        const res = await api.post('/api/register').send({ name: 'TrungPham',  email: 'trungpham1998@gmail.com', password: 'Trungpham@123' });
        expect(res).toBe(true);
    });

    test('create user duplicate -> success: False', async () => {
        const { body: { success }} = await api.post('/api/register').send({ name: 'TrungPham', email: 'trungpham1998@gmail.com', password: 'Trungpham@123' });
        expect(success).toBe(false);
    });
});
