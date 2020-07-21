const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//IMPORT ROUTES
const talkRoute = require('./routes/TalkRoute');
app.use('/talks', talkRoute);

const attendeeRoute = require('./routes/AttendeeRoute');
app.use('/attendees', attendeeRoute);

//ROUTES
app.get('/', (req, res) => {
	res.send('We are on home!');
});


//CONNECT TO DB
mongoose.connect( process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true }, () => console.log('connected to DB!'));


//LISTEN TO SERVER
app.listen(3000);