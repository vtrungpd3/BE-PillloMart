/*global describe beforeEach test expect*/
/*eslint no-undef: "error"*/

const { api, configHeader, mongo } = require('./common');

describe('POST /api/user', () => {
    beforeEach(() => {
        mongo();
    });

    test('get user -> success: True', async () => {
        const { body } = await api.get('/api/user').set('Authorization', `${configHeader.token}`);
        expect(body).toBe(true);
    });
});
