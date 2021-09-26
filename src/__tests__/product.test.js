/*global describe test expect*/
/*eslint no-undef: "error"*/

const { api } = require('./common');

describe('POST /api/product', () => {
    let productId = '';

    test('create Product -> success: True', async () => {
        const { body: { success, data }} =
            await api
                .post('/api/product')
                .send({
                    category: 'japan',
                    type: 'cotton',
                    name: 'Trung ok',
                    price: 10000000,
                    avatar: '1632573325002.png'
                });
        expect(success).toBeTruthy();
        productId = data._id;
    });

    test('get All Product -> success: True', async () => {
        const { body: { success }} = await api.post('/api/product/s');
        expect(success).toBeTruthy();
    });

    test('get by id Product -> success: False', async () => {
        const { body: { success }} = await api.get('/api/product/' + productId);
        expect(success).toBeTruthy();
    });
});
