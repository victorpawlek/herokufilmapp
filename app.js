const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const router = require('./routes/filme');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

require('colors');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ limit: '15mb', extended: false }));
app.use(bodyParser.json({ limit: '15mb' }));

app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(history());
app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

app.use(express.json());
app.use('/', router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT);
