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
      DOB:{
         type: Date,
         require: true,
      },
      service:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'services',
      }, 
      slot:{
         type: Date,
         default: Date.now()
      }, 
      massage:{
         type: String,
         default : "Not Fill",
         trim:true
      }, 
      status:{
         type: String,
         default:"booking intialized"
      }, 
},{ timestamps: true });

const Consultation = mongoose.model('Consultation',MeetSchema);
module.exports = Consultation;