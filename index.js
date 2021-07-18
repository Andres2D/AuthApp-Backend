const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Creating the server/application of express
const app = express();

// DB Connection
dbConnection();

// Public dir
app.use(express.static('public'))

// CORS
app.use(cors())

// Read and parse of body
app.use(express.json());

// Routes
app.use( '/api/auth', require('./routes/auth'));

// Router driven
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`server runing on port ${process.env.PORT}`);
});