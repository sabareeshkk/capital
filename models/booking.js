const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookingSchema = new Schema({
   table : { type: mongoose.Schema.Types.ObjectId, ref: 'Table'},
   created_date : { type: Date, default: Date.now },
   booked_from : { type: Date , required: true },
   booked_to: { type: Date, required: true },
   is_active: Boolean
});

const Bookings = mongoose.model('Booking', BookingSchema);

module.exports = Bookings;