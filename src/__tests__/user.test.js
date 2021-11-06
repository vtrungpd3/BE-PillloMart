// /*global describe beforeAll test expect*/
// /*eslint no-undef: "error"*/
//
// const { api } = require('./common');
//
// describe('POST /api/user', () => {
//     let token = '';
//
//     beforeAll( async () => {
//         const { body: { data }} =
//             await api
//                 .post('/api/login')
//                 .send({
//                     email: 'trungpham1@gmail.com',
//                     password: 'Trungpham@123'
//                 });
//
//         token = data.token;
//     });
//
//     test('get user by token -> success: True', async () => {
//         const { body: { success } } =
//             await api
//                 .get('/api/user')
//                 .set('Authorization', `${token}`);
//
//         expect(success).toBeTruthy();
//     });
//
//     test('get user by token error -> success: False', async () => {
//         const { body: { success } } =
//             await api
//                 .get('/api/user')
//                 .set('Authorization', `${token}123`);
//
//         expect(success).toBeFalsy();
//     });
//
//     test('update name for user -> success: True', async () => {
//         const { body: { success } } =
//             await api
//                 .put('/api/user')
//                 .set('Authorization', `${token}`)
//                 .send({
//                     name: 'Trungpham@123',
//                     avatar: '1632573325002.png'
//                 });
//
//         expect(success).toBeTruthy();
//     });
//
//     test('update name error -> success: False', async () => {
//         const { body: { success } } =
//             await api
//                 .put('/api/user')
//                 .set('Authorization', `${token}`)
//                 .send({
//                     name: '1213',
//                 });
//
//         expect(success).toBeFalsy();
//     });
// });
