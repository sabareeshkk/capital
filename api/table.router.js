const express = require('express');
const router = express.Router();

const Table = require('../models/table');

/**
 * get all tables
 * @return {[array]}
 */
router.get('/', function(req, res) {

	Table.find({}, function(err, tables) {
        if(err) res.send(500, { error: err });
        res.json(tables);
	});
});

/**
 * get table by id
 * @param  tableid{string}
 * @return {[type]}
 */
router.get('/:id', function(req, res) {
	
	Table.findOne({ _id: req.params.id }, function(err, table) {
		if(err) res.send(500, { error: err });
		res.json(table)
	});
});

/**
 * create new table
 * @param  restaurant{[string]}
 * @param  table_number{number}
 * @param  capacity{number}
 * @return {[object]}
 */
router.post('/', function(req, res) {
	const data = {
		restaurant: req.body.restaurant,
		table_number: req.body.table_number,
		capacity: req.body.capacity,
		is_booked: false
	};

	const table = new Table(data);
	table.save().then(function(result){
		return res.json(result);
	},
	function(err){
		return res.send(500, { error: err });
	});
})

/**
 * update table  by id
 * @param  table_number{[number]}
 * @param  capacity{number}
 * @return {[object]}
 */
router.put('/:id', function(req, res) {
	const data = {
		table_number: req.body.table_number,
		capacity: req.body.capacity,
	};
	Table.findOneAndUpdate({_id: req.params.id}, data, { upsert: true }, function(err, table) {
		if(err) return res.send(500, { error: err });
		return res.json({status: "successfully updated"});
	});
})

/**
 * delete table id
 * @param  table id{}
 * @return {[object]}
 */
router.delete('/:id', function(req, res) {
	
	Table.findByIdAndRemove({ _id: req.params.id }, function(err, restaurant) {
		if(err) return res.send(500, { error: err });
		return res.json({status: "deleted successfully"});
	});
});

/**
 * update table capacity
 * @param  table id{[string]}
 * @return {[object]}
 */
router.put('/:id/capacity', function(req, res) {
	const data = {
		capacity: req.query.capacity
	};

	Table.findOneAndUpdate({_id: req.params.id}, data, {upsert: true}, function(err, table) {
		if(err) return res.status(500).send({ error: err });
		return res.json(table);
	});
})

/**	
 * search table by capacity for a given restaurant
 * @param  restaurant{[string]}
 * @param  capacity{number}
 * @return {[type]}
 */
router.get('/search/capacity', function(req, res) {
	const query = {
		restaurant: req.query.restaurant,
		capacity: req.query.capacity
	};

	Table.find(query, function(err, table) {
		if(err) return res.status(500).send({error: err});
		res.json(table);
	});
});

module.exports = router;