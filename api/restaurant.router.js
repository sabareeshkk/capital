
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function (req, res) {

  Restaurant.find({}, function (err, restaurant) {
  	console.log('restaurant', restaurant)
  	res.json(restaurant);
  });
  
});

router.get('/:id', function(req, res) {
	Restaurant.findOne({ _id: req.params.id }, function(err, restaurant) {
		console.log('single restaurant', restaurant);
		res.json(restaurant);
	});
});

router.post('/', function(req, res) {
	
	const data = {
		name: req.body.name,
		location: req.body.location
	};
    
    const restaurant = new Restaurant(data);
    restaurant.save().then(function(result) {
    	res.json(result);
    });

});

router.put('/:id', function(req, res) {
	const data = {
		name: req.body.name,
		locaton: req.body.location
	};

	Restaurant.findOneAndUpdate({_id: req.params.id}, data, { upsert: true }, function(err, restaurant) {
		res.json({status: "successfully updated"});
	});
})

router.delete('/:id', function(req, res) {

	Restaurant.findByIdAndRemove({ _id: req.params.id }, function(err, restaurant) {
		res.json({status: "deleted successfully"});
	});
});

// search by name and locatons
router.get('/search/restaurant', function(req, res) {
	const searchText = req.query.search; 
    Restaurant.find({$text: {$search: searchText}}, function(err, restaurant) {
    	if(err) return res.status(500).send({error: err});
    	res.json(restaurant);
    });
});


module.exports = router;