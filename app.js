const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const app = express();
const port = 3000;
// Connect to database
mongoose.connect(config.database);
    //On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
});
    //On error
 mongoose.connection.on('error', (err) => {
     console.log('Database error' + err);
});

// Cors middleware
app.use(cors());

// Set Static folder(the whole clientside folder)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
// Parses incoming body(grab data from a form)
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Sever started on port ' + port);
});
