require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB = process.env.MONGO_URI;

module.exports = {
    PORT,
    MONGODB
};