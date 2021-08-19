const app = require('./src/app');
const config = require('./src/utils/config');
const logger = require('./src/utils/logger');

app.listen(config.PORT, () => {
    logger.info(`Server running on port http://localhost:${config.PORT}`);
});