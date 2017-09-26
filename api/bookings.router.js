const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

router.get('/', function(req, res) {

	Booking.find({is_active: true}, function(err, bookings) {
		if(err) return res.status(500).send({error: err});
		res.json(bookings);
	});
});

router.get('/:id', function(req, res) {
	
	Booking.findOne({_id: req.params.id}, function(err, booking) {
		if(err) return res.status(500).send({error: err});
		res.json(booking);
	});
});

//get bookings of a table by time-range 
router.get('/:id/table/alloted', function(req, res) {
    const booked_from = new Date(req.query.booked_from);
    const booked_to = new Date(req.query.booked_to);
    const table_id = req.params.id;

    Booking.find({table: table_id, booked_from: {"$gte": booked_from, "$lt": booked_to}}, function(err, bookings) {
    	if(err) return res.status(500).send({error: err});
    	res.json(bookings);
    });

});

//create bookings
router.post('/', function(req, res) {

	const data = {
		table: req.body.table,
	    booked_from: new Date(req.body.booked_from),
	    booked_to: new Date(req.body.booked_to),
	    is_active: true	
	};

	const booking = new Booking(data);
	booking.save().then(function(result) {
		return res.json(result);
	},
	function(err) {
		return res.status(500).send({error: err});
	});

});

router.put('/cancel', function(req, res) {
	const query = {
		_id: req.params.booking_id,
	}
    
    Booking.findOneAndUpdate(query, { is_active: false }, { upsert: true }, function(err, booking) {
    	if(err) return res.status(500).send({error: err});
    	res.json(booking);
    });
})

module.exports = router;