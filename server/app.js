const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// All Routes Imported Here
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();
// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); 
} 
// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
// Allow API Usage from Any Point
app.use(cors());

// Testing Middleware for Development
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);
  next();
});
// All Routes Here
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/video', videoRoutes);
app.use('/api/v1/subscribe', subscribeRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/like', likeRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"../client", "build", "index.html"))
})

app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, "../client", "build")))
// All Other Undefined Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
