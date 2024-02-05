// This file sets up the connection to the mongoose database.
require('dotenv').config()
const mongoose = require('mongoose');

let atlasConnectionString = undefined

if(process.env.MONGODB_URI){

    atlasConnectionString = encodeURI(process.env.MONGODB_URI)
}

mongoose.connect(atlasConnectionString || process.env.LOCALHOST_DB_CONNECTION);

module.exports = mongoose.connection;
