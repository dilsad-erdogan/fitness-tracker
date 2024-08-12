const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const logger = require('./logger');

var connectDB = require('./config/mongoDB');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Request loglaması için bir middleware ekle
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} - ${req.ip}`);
    next();
});

app.use('/auth', require('./routes/auth'));
app.use('/heightWeight', require('./routes/heightWeight'));
app.use('/movement', require('./routes/movement'));
app.use('/movementTitle', require('./routes/movementTitle'));
app.use('/program', require('./routes/program'));
app.use('/set', require('./routes/set'));
app.use('/user', require('./routes/user'));
app.use('/userProgram', require('./routes/userProgram'));
app.use('/userRole', require('./routes/userRole'));
app.use('/todo', require('./routes/todoList'));
app.use('/weeklyCalorie', require('./routes/weeklyCalorie'));

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Homepage");
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});