const express = require('express');
const cors = require('cors');
const path = require('path');
const connect = require('./src/services/mongo');
const config = require('./src/config');
const initAppRoute = require('./src/routers');

const app = express();

app.get('/', (req, res) => res.send('Server up and running'));

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

connect();
initAppRoute(app);

app.listen(config.PORT, () => {
    console.log(`Server running on port http://localhost:${config.PORT}`);
});