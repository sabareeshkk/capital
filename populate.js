var async = require('async')
//Import the mongoose module
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Restaurant = require('./models/restaurant');
const Table = require('./models/table');
const Booking = require('./models/booking');
const Reviews = require('./models/reviews');

let count = 0;
//Set up default mongoose connection
const mongoDB = 'mongodb://localhost/capital';
mongoose.connect(mongoDB);

//Get the default connection
const db = mongoose.connection;
// console.log(db);
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function createRestaurent(name, location) {
    const restaurantDetails = {
         name: name,
         location: location
    };

    const restaurant = new Restaurant(restaurantDetails);
    
    return restaurant.save().then(function(result) {
        console.log('result', result);
        return result
    });
}

function createTables(id, table_number, capacity, is_booked) {
   const tableDetails = {
    restaurant: id,
    table_number: table_number,
    capacity: capacity,
    is_booked: is_booked
   }
   
   const table = new Table(tableDetails);
   return table.save().then(function(result) {
    return result
   });

};

function createBookings(id, booked_from, booked_to, is_active) {
    const bookingDetails = {
        table: id,
        booked_from: booked_from,
        booked_to: booked_to,
        is_active: is_active
    };
    
    const booking = new Booking(bookingDetails);
    return booking.save().then(function(result) {
        return result;
    });

}

function createReviews(id, comment) {
   const reviewDetails = {
       restaurant: id,
       comment: comment
   };

   const reviews = new Reviews(reviewDetails);
   
   return reviews.save().then(function(result) {
    return result;
   });

}

function populateDb(restaurant_name, restaurant_place, cb) {
    createRestaurent(restaurant_name, restaurant_place)
    .then(function(res) {
        createReviews(res.id, [{body: 'woowwww'}]);
        count += 1
        return createTables(res.id, count, 5, false);
    })
    .then(function(res) {
        return createBookings(res.id, new Date(), new Date(), true)
    }).then(function(res) {
        cb(null, res);
    });  
}

//populate db
function create(){
	async.parallel([
		function(callback) {
          populateDb('shaap', 'banglore', callback);
        },
        function(callback) {
          populateDb('kaaram', 'banglore', callback);
        },
        function(callback) {
            populateDb('imperial', 'koramangala', callback);
        }],
        function (err, result){
        	if (err){
        		console.log(err);
        	}
        	console.log('result', result);
        	//close the connection
            db.close();

        });
}

//initialize population
create();