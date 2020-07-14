const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
const morgan = require('morgan')

// Dotenv adds properties from congig.env to process.env
dotenv.config({ path: './server/config.env'});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const DB = process.env.mongoURI;
mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));
  
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
  
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
});