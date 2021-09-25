/*global describe beforeAll test expect*/
/*eslint no-undef: "error"*/

const { api } = require('./common');
const User = require('../models/user');

describe('POST /api/register', () => {
    beforeAll( async () => {
        await User.findOneAndDelete({ email: 'trungpham1998@gmail.com' });
    });

    test('create user -> success: True', async () => {
        const { body: { success }} = await api.post('/api/register').send({ name: 'TrungPham', email: 'trungpham1998@gmail.com', password: 'Trungpham@123' });
        expect(success).toBe(true);
    });

    test('duplicate user -> success: False', async () => {
        const { body: { success }} = await api.post('/api/register').send({ name: 'TrungPham', email: 'trungpham1998@gmail.com', password: 'Trungpham@123' });
        expect(success).toBe(false);
    });

    test('password not strong -> success: False', async () => {
        const { body: { success }} = await api.post('/api/register').send({ name: 'TrungPham', email: 'trungpham19981@gmail.com', password: 'Trungpham' });
        expect(success).toBe(false);
    });
});
