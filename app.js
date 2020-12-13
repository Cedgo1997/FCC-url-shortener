require('dotenv').config();
const ShortUrl = require('./models/shorturl.model');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');
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

const regex = /^(ftp|http|https):\/\/[^ "]+$/;
app.post('/api/shorturl/new', (req, res) => {
	let url = req.body.url;

	var validate = regex.test(url);
	if (validate) {
		ShortUrl.findOne({ url }, (err, doc) => {
			if (doc) {
				res.json({
					url: doc.url,
					hash: doc.hash,
				});
				return;
			} else {
				let shortUrlDoc = new ShortUrl({
					url,
					hash: shortid.generate(),
				});
				shortUrlDoc.save((err, shortDoc) => {
					res.json({
						url: shortDoc.url,
						hash: shortDoc.hash,
					});
				});
				return;
			}
		});
	} else {
		res.json({
			error: 'Invalid Url',
			example: 'https://www.freecodecamp.org',
		});
	}
});

// GET

app.get('/api/shorturl/:hash', (req, res) => {
	const hash = req.params.hash;
	ShortUrl.findOne({ hash }, (err, doc) => {
		if (doc) {
			res.redirect(doc.url);
		} else {
			res.json({
				error: "That's not a valid shorturl",
			});
		}
	});
});

//LISTENING
app.listen(port, () => console.log('Listening on port: ' + port));
