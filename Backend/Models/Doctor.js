const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
   name: {
      type: String,
      require: true,
      trim: true
   },
   phone:{
      type: Number,
      unique: true,
      require: true,
      trim: true
   },
   Room:{
      type:Array,
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
   star: {
      type: mongoose.Types.Decimal128,
      require: true,
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
   url: {
      type: String,
      require: true,
      trim: true
   },
   password: {
      type: String,
      require: true
   },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;