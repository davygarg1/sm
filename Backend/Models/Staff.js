const mongoose = require('mongoose');
const { Schema } = mongoose;

const StaffSchema = new Schema({
   name: {
      type: String,
      require: true,
      trim: true
   },
   email: {
      type: String,
      unique: true
   },
   description: {
      type: String,
      require: true,
      trim: true
   },
   study: {
      type: String,
      require: true,
      trim: true
   },
   work: {
      type: String,
      require: true,
      trim: true
   },
   experience: {
      type: Number,
      require: true,
      trim: true
   },
   status: {
      type: Boolean,
      require: true,
   },
   password: {
      type: String,
      require: true
   },
}, { timestamps: true });

const Staff = mongoose.model('Staff', StaffSchema);
module.exports = Staff;