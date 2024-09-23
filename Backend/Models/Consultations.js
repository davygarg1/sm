const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeetSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   },
   name: {
      type: String,
      require: true,
      trim: true
   },
   phone: {
      type: Number,
      require: true,
      trim: true
   },
   email: {
      type: String,
      trim: true
   },
   DOB: {
      type: Date,
      require: true,
   },
   service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'services',
   },
   servicename: {
      type: String,
   },
   slot: {
      type: Date
   },
   massage: {
      type: String,
      default: "Not Fill",
      trim: true
   },
   active: {
      type: Boolean,
      default: true
   },
   status: {
      type: String,
      default: "booking intialized"
   },
}, { timestamps: true });

const Consultation = mongoose.model('Consultation', MeetSchema);
module.exports = Consultation;