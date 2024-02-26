const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
     },
      star:{
         type: Number,
         require: true,
      },
      service:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'services',
      },
      description:{
        type: String,
        require: true,
        trim: true
     }, 
},{ timestamps: true });

const Feedback = mongoose.model('Feedback',FeedbackSchema);
module.exports = Feedback;