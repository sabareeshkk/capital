const express = require('express');
const router = express.Router();

const Review = require('../models/reviews');

router.get('/:restaurantId', function (req, res) {
	const query = {
		restaurant: req.params.restaurantId
	};

	Review.find(query, function(err, reviews) {
		if(err) return res.status(500).send({error: err});
		res.json(reviews);
	});
})

router.post('/', function(req, res) {
	const query = {
		restaurant: req.body.restaurant
	};
	const data = {
		$push: { comment: {body: req.body.message}}
	}
	
	Review.update(query, data, { upsert: true }, function(err, review) {
		if(err) return res.status(500).send({error: err});
		res.json(review);
	})
})

module.exports = router;