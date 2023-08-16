var express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

var app = express();
app.use(cors());
app.use(express.json());
dbConnection();

app.use('/api', require('./routes/rutas'));

app.listen(process.env.PORT, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');
});