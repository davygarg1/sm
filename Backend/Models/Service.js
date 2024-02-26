const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true
   },
   name: {
      type: String,
      require: true,
      trim: true
   },
   description: {
      type: String,
      require: true,
      trim: true
   },
   status: {
      type: Boolean,
      require: true,
   },
}, { timestamps: true });

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;