var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RestaurentSchema = new Schema({
  name: String,
  location: String,
  created_at: { type: Date, default: Date.now }
});

RestaurentSchema.index({name: 'text', location: 'text'});

var Restaurent = mongoose.model('Restaurant', RestaurentSchema);

module.exports = Restaurent;