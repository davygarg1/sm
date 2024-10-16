const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
   User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation',
   },
   amount: {
      type: Number,
      require: true,
      trim: true
   },
   email: {
      type: String,
      trim: true,
      require: true,
   },
   address: {
      type: String,
      require: true,
   },
   payment: {
      type: String,
      require: true,
      trim: true
   },
   treatment: {
      type: String,
      trim: true
   },

}, { timestamps: true });

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;