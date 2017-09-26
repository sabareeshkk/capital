const express = require('express')
const mongoose = require('mongoose');                     
const morgan = require('morgan');             
const bodyParser = require('body-parser');    

const restaurant = require('./api/restaurant.router');
const tables = require('./api/table.router');
const bookings = require('./api/bookings.router');
const reviews = require('./api/reviews.router');

const app = express();

//mongo db connection
mongoose.connect('mongodb://localhost:27017/capital', {
  useMongoClient: true,
});

//middlewares 
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());
app.use(morgan('dev'));

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
	res.json({status: "You are in"})
});

app.use('/api/restaurant', restaurant);
app.use('/api/tables', tables);
app.use('/api/bookings', bookings);
app.use('/api/reviews', reviews);

app.listen(3000, function () {

});