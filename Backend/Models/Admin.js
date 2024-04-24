const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeetSchema = new Schema({

      name:{
         type: String,
         require: true,
         trim: true
      },
      password:{
         type: String,
         require: true
      },
      phone:{
         type: Number,
         unique: true,
         require: true,
         trim: true
      },
      status:{
         type: Boolean,
         default: true,
         require: true
      }, 

},{ timestamps: true });

const Admin = mongoose.model('Admin',MeetSchema);
module.exports = Admin;