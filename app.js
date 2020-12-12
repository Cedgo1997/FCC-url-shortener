require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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
// to parse POST bodies
app.use(bodyParser.urlencoded({ extended: false }));

// First Endpoint
app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

// POST
app.post('/api/shorturl/new', (req, res) => {
	const url = req.body.url;
	res.json({
		url: url,
	});
});

//LISTENING
app.listen(port, () => console.log('Listening on port: ' + port));
