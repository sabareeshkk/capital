const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
   restaurant : { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
   comment : [{ body: String, date: { type: Date, default: Date.now }}]
});

const Reviews = mongoose.model('Review', ReviewSchema);

module.exports = Reviews;