const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require('path');

const AppError = require('./utills/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

//render templates
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//serve public files
app.use(express.static(path.join(__dirname, 'public')));

//Enable CORS
app.use(cors());

//Set security HTTP headers
app.use(helmet());
//Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//parse cookie
app.use(cookieParser());

//Data sanitization against injections
app.use(mongoSanitize());

//Data sanitizaation against xss
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantinty',
      'ratingAverage',
      'axGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

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

//show request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRoutes);

//mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

//show error of not existing route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
