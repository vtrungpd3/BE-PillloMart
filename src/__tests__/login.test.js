/*global describe beforeEach test expect*/
/*eslint no-undef: "error"*/

const { api, mongo } = require('./common');

describe('POST /api/login', () => {
    beforeEach(() => {
        mongo();
    });

    test('should res success true', async () => {
        const res = await api.post('/api/login').send({ email: 'trungpham123@gmail.com', password: 'Trungpham@123' });
        expect(res.body.success).toBe(true);
    });

    test('should res success false', async () => {
        const res = await api.post('/api/login').send({ email: 'trungpham123@gmail.com', password: 'Trungpham@123123' });
        expect(res.body.success).toBe(false);
    });

    test('should res success false when not true email', async () => {
        const res = await api.post('/api/login').send({ email: 'trungpham12323213@gmail.com', password: 'Trungpham@123' });
        expect(res.body.success).toBe(false);
    });
});
