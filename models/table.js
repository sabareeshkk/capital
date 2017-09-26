var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TableSchema = new Schema({
  restaurant : { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
  table_number : { type: Number, required: true, unique: true },
  capacity: { type: Number, reqiured: true },
  is_booked: Boolean
});

var Table = mongoose.model('Table', TableSchema);

module.exports = Table;