require('dotenv').config();
const ShortUrl = require('./models/shorturl.model');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');
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
		ShortUrl.findOne({ original_url: url }, (err, doc) => {
			if (doc) {
				res.json({
					original_url: doc.original_url,
					short_url: doc.short_url,
				});
				return;
			} else {
				let shortUrlDoc = new ShortUrl({
					original_url: url,
					short_url: shortid.generate(),
				});
				shortUrlDoc.save((err, shortDoc) => {
					res.json({
						original_url: shortDoc.original_url,
						short_url: shortDoc.short_url,
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
	ShortUrl.findOne({ short_url: hash }, (err, doc) => {
		if (doc) {
			res.redirect(doc.original_url);
		} else {
			res.json({
				error: "That's not a valid shorturl",
			});
		}
	});
});

//LISTENING
app.listen(port, () => console.log('Listening on port: ' + port));
