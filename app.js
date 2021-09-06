const express = require('express');
const cors = require('cors');
const path = require('path');
const ConnectDB = require('./src/db');
const config = require('./src/config');
const initAppRoute = require('./src/routers');

const app = express();

app.get('/', (req, res) => res.send('Server up and running'));

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

ConnectDB();
initAppRoute(app);

app.listen(config.PORT, () => {
    console.log(`Server running on port http://localhost:${config.PORT}`);
});