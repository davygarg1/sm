const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestimonialsSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'staff',
   },
   name: {
      type: String,
      require: true,
      trim: true
   },
   star: {
      type: Number,
      require: true,
   },
   status: {
      type: Boolean,
      default: false
   },
   service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'services',
   },
   massage: {
      type: String,
      require: true,
      trim: true
   },
}, { timestamps: true });

const Testimonials = mongoose.model('Testimonials', TestimonialsSchema);
module.exports = Testimonials;