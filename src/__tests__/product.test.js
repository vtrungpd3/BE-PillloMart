/*global describe test expect*/
/*eslint no-undef: "error"*/

const { api } = require('./common');

describe('POST /api/product', () => {
    let productId = '';

    describe('Create /api/product', () => {
        test('Should create -> success: True', async () => {
            const { body: { success, data }} =
                await api
                    .post('/api/product')
                    .send({
                        category: 'japan',
                        type: 'cotton',
                        name: 'Trung',
                        price: 10000000,
                        avatar: '1632573325002.png'
                    });
            expect(success).toBeTruthy();
            productId = data._id;
        });

        test('Should create -> success: False', async () => {
            const { body: { success }} =
                await api
                    .post('/api/product')
                    .send({
                        category: 'japan',
                        type: 'cotton',
                        name: '',
                        price: 10000000,
                        avatar: '1632573325002.png'
                    });
            expect(success).toBeFalsy();
        });
    });

    describe('Get All /api/product', () => {
        test('Should get all -> success: True', async () => {
            const { body: { success }} = await api.post('/api/product/s');
            expect(success).toBeTruthy();
        });

        test('Should get all -> success: False', async () => {
            const { body: { success }} = await api.post('/api/product/s').send({ pageInfo: { pageIndex: -1 } });
            expect(success).toBeFalsy();
        });
    });


    describe('Get by id /api/product/:id', () => {
        test('Should Response -> success: True', async () => {
            const { body: { success }} = await api.get('/api/product/' + productId);
            expect(success).toBeTruthy();
        });

        test('Should Response -> success: False', async () => {
            const { body: { success }} = await api.get('/api/product/123' + productId);
            expect(success).toBeFalsy();
        });
    });


    describe('Update by id Product /api/product/:id', () => {
        test('Should Response -> success: True', async () => {
            const { body: { success }} =
                await api
                    .put('/api/product/' + productId)
                    .send({
                        category: 'usa',
                        type: 'cotton',
                        name: 'Trung',
                        price: 100000,
                        avatar: '1632573325002.png'
                    });
            expect(success).toBeTruthy();
        });

        test('Should Response -> success: False', async () => {
            const { body: { success }} =
                await api
                    .put('/api/product/' + productId)
                    .send({
                        category: 'usa',
                        type: 'cotton',
                        name: '',
                        price: 100000,
                        avatar: '1632573325002.png'
                    });
            expect(success).toBeTruthy();
        });
    });

});
