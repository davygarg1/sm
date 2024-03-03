const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
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
   url: {
      type: String,
      require: true,
      trim: true
   },
   status: {
      type: Boolean,
      require: true,
   },
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;