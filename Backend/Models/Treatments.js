const mongoose = require('mongoose');
const { Schema } = mongoose;

const TreatmentsSchema = new Schema({
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
   url: {
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

const Treatments = mongoose.model('Treatment', TreatmentsSchema);
module.exports = Treatments;