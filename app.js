require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = 3000;

// Mongoose Connect
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//Config

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

// First Endpoint
app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

//LISTENING
app.listen(port, () => console.log('Listening on port: ' + port));
