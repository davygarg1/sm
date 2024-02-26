const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Feedback = require('./Models/Feedback');
const Consultation = require('./Models/Consultations');
const Service = require('./Models/Service');
const Staff = require('./Models/Staff');
const User = require('./Models/User');

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb+srv://jashan:jashan@jashan.ulgyp2g.mongodb.net/Samarpitam?retryWrites=true&w=majority').then(()=>{console.log("connect to mongodb sucessfull" )})
  } catch (error) {
    console.log("Failed to connect")
  } 
}

module.exports = connectToMongo;