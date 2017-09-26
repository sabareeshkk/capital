const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

/**
 * get all bookings not filtered every bookings
 * @return {[array]}
 */
router.get('/', function(req, res) {

	Booking.find({is_active: true}, function(err, bookings) {
		if(err) return res.status(500).send({error: err});
		res.json(bookings);
	});
});

/**
 * get booking by bookingid
 * @param  booking_id{[type]}
 * @return {[array]}
 */
router.get('/:id', function(req, res) {
	
	Booking.findOne({_id: req.params.id}, function(err, booking) {
		if(err) return res.status(500).send({error: err});
		res.json(booking);
	});
});

 
/**
 * get bookings of a table by time-range
 * @param  booked_from{[date]}
 * @param  booked_to{[date]}
 * @return {[object]}
 */
router.get('/:id/table/alloted', function(req, res) {
    const booked_from = new Date(req.query.booked_from);
    const booked_to = new Date(req.query.booked_to);
    const table_id = req.params.id;

    Booking.find({table: table_id, booked_from: {"$gte": booked_from, "$lte": booked_to}, booked_to: {"$gte": booked_from, "$lte": booked_to}, is_active: true}, function(err, bookings) {
    	if(err) return res.status(500).send({error: err});
    	res.json(bookings);
    });

});

/**
 * create new booking 
 * @param  table{[string]}
 * @param  booked_from{date}
 * @param  booked_to{[date]}
 * @return {[type]}
 */
router.post('/', function(req, res) {

	const data = {
		table: req.body.table,
	    booked_from: new Date(req.body.booked_from),
	    booked_to: new Date(req.body.booked_to),
	    is_active: true	
	};
    
    Booking.find({table: req.body.table, booked_from: {"$gte": data.booked_from, "$lte": data.booked_to}, booked_to: {"$gte": data.booked_from, "$lte": data.booked_to}, is_active: true}, 
    	function(err, bookings) {
    	if(err) return res.status(500).send({error: err});
	    console.log('bookings', bookings);
	    if (!bookings.length) {
	        const booking = new Booking(data);
    	    booking.save().then(function(result) {
		        return res.json(result);
	        },
	        function(err) {
		        return res.status(500).send({error: err});
	        });	
	    }
	    else {
	    	res.status(500).send({status: "Already have a reservation"});
	    }
    });

});

/**
 * cancel the booking 
 * @param  booking_id{[string]}
 * @return {[array]}
 */
router.put('/:bookingId/cancel', function(req, res) {
	const query = {
		_id: req.params.bookingId,
	}
    
    Booking.findOneAndUpdate(query, { is_active: false }, { upsert: true }, function(err, booking) {
    	if(err) return res.status(500).send({error: err});
    	res.json(booking);
    });
})

module.exports = router;