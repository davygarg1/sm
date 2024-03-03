const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
        unique: true
      },
      DOB:{
         type: Date,
         trim: true
      },
      password:{
         type: String,
         require: true
      },
},{ timestamps: true });

const User = mongoose.model('User',UserSchema);
module.exports = User;