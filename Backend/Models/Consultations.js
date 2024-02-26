const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeetSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
     },
      name:{
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
      email:{
        type: String,
        trim: true
      },
      age:{
         type: Number,
         require: true,
         trim: true
      },
      service:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'services',
         default: "65dc1d2a8a37c222fb9ce53c"
      }, 
      slot:{
         type: Date,
         default: Date.now()
      }, 
      status:{
         type: String,
         default:"booking intialized"
      }, 
},{ timestamps: true });

const Consultation = mongoose.model('Consultation',MeetSchema);
module.exports = Consultation;