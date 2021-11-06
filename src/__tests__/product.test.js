// /*global describe test expect*/
// /*eslint no-undef: "error"*/
// /* exported createdAt updatedAt */
//
// const { api } = require('./common');
//
// describe('Product APIs', () => {
//     const mockProduct = {
//         category: 'japan',
//         type: 'cotton',
//         name: 'Trung',
//         price: 10000000,
//         avatar: '1632573325002.png'
//     };
//
//     describe('Test Get route /api/product', () => {
//         test('It should return Create success', async () => {
//             const { body: { success, data }} = await api.post('/api/product').send(mockProduct);
//             const { _id, createdAt, updatedAt, ...payload } = data || {};
//             expect(success).toBeTruthy();
//             expect(payload).toEqual(mockProduct);
//             mockProduct._id = _id;
//         });
//
//         test('It should return Create false', async () => {
//             const { body: { success }} = await api.post('/api/product').send({ ...mockProduct, name: '' });
//             expect(success).toBeFalsy();
//         });
//     });
//
//     describe('Test Get All route /api/product', () => {
//         test('It should return Product All', async () => {
//             const { body: { success, data }} = await api.post('/api/product/s');
//             expect(success).toBeTruthy();
//             expect(data.length).toBe(1);
//         });
//
//         test('It should return false', async () => {
//             const { body: { success }} = await api.post('/api/product/s').send({ pageInfo: { pageIndex: -1 } });
//             expect(success).toBeFalsy();
//         });
//     });
//
//
//     describe('Test Get by id route /api/product/:id', () => {
//         test('It should return True', async () => {
//             const { body: { success, data }} = await api.get('/api/product/' + mockProduct._id);
//             const { createdAt, updatedAt, ...payload } = data || {};
//
//             expect(success).toBeTruthy();
//             expect(payload).toEqual(mockProduct);
//         });
//
//         test('It should return false', async () => {
//             const { body: { success }} = await api.get('/api/product/123');
//             expect(success).toBeFalsy();
//         });
//     });
//
//
//     describe('Test Update by Id route /api/product/:id', () => {
//         test('It should return True', async () => {
//             const { body: { success, data }} = await api.put('/api/product/' + mockProduct._id).send({ ...mockProduct, category: 'usa' });
//             const { createdAt, updatedAt, ...payload } = data || {};
//
//             expect(success).toBeTruthy();
//             expect(payload).toEqual({...mockProduct, category: 'usa' });
//         });
//
//         test('It should return False', async () => {
//             const { body: { success }} = await api.put('/api/product/' + mockProduct._id).send({ ...mockProduct, category: '' });
//             expect(success).toBeFalsy();
//         });
//     });
//
//
//     describe('Test Delete by Id route /api/product/:id', () => {
//         test('It should return False', async () => {
//             const { body: { success }} = await api.delete('/api/product/71198' + mockProduct._id);
//             expect(success).toBeFalsy();
//         });
//
//         test('It should return True', async () => {
//             const { body: { success }} = await api.delete('/api/product/' + mockProduct._id);
//             expect(success).toBeTruthy();
//         });
//     });
// });
