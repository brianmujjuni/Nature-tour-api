const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utills/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//Set security HTTP headers
app.use(helmet());
//Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against injections
app.use(mongoSanitize());
//Data sanitizaation against xss
app.use(xss());

//developemnt logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too may requests from this IP,Please try again in an hour',
});
//limit number of requests
app.use('/api', limiter);

//serve public files
app.use(express.static(`${__dirname}/public`));

//show request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//show error of not existing route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
