const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const conpression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globaleErrorHandler = require('./controllers/errorController');
const foodtruckRouter = require('./routes/foodtruckRoutes');
const geoRouter = require('./routes/geoRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Implement CORS
app.use(cors());
app.options('*', cors());

// Display static files
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL MIDDLEWARES
// Helmet -- set security HTTP headers
app.use(helmet());

// Morgan -- development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Express-Rate-Limit -- limit requests from same API
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.'
});
app.use('/api', limiter);

// Body Parser -- reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));
app.use(cookieParser());

// Data Sanitization
// -- against NoSQL query injection
app.use(mongoSanitize());

// -- against XSS
app.use(xss());

// HPP -- prevent parameter pollution
// nothing yet

// app.use(compression());

// Routers
app.use('/api/v1/foodtrucks', foodtruckRouter);
app.use('/api/v1/geos', geoRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404));
});

app.use(globaleErrorHandler);

module.exports = app;
