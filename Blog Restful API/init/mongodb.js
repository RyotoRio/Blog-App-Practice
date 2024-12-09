const mongoose = require('mongoose');
const {connection_url} = require('../config/keys');

const connectMongodb = async () => {
    try {
        await mongoose.connect(connection_url);
        console.log('db connected')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMongodb;