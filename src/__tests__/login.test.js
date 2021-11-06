// /*global describe test expect*/
// /*eslint no-undef: "error"*/
//
// const { api } = require('./common');
//
// describe('POST /api/login', () => {
//     test('login -> success: True', async () => {
//         const { body: { success }} = await api.post('/api/login').send({ email: 'trungpham123@gmail.com', password: 'Trungpham@123' });
//         expect(success).toBeTruthy();
//     });
//
//     test('login -> success: False', async () => {
//         const { body: { success }} = await api.post('/api/login').send({ email: 'trungpham123@gmail.com', password: 'Trungpham@123123' });
//         expect(success).toBeFalsy();
//     });
//
//     test('email not found -> success: False', async () => {
//         const { body: { success }} = await api.post('/api/login').send({ email: 'trungpham12323213@gmail.com', password: 'Trungpham@123' });
//         expect(success).toBeFalsy();
//     });
// });
