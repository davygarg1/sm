const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogDataSchema = new Schema({
   Blog:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'blogs',
   },
   name: {
      type: String,
      require: true,
      trim: true
   },
   description: {
      type: Object,
      require: true,
      trim: true
   },
   status: {
      type: Boolean,
      require: true,
   },
}, { timestamps: true });

const BlogData = mongoose.model('BlogData', BlogDataSchema);
module.exports = BlogData;