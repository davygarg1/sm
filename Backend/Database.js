const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Testimonials = require('./Models/Testimonials');
const Consultation = require('./Models/Consultations');
const Treatments = require('./Models/Treatments');
const Doctor = require('./Models/Doctor');
const User = require('./Models/User');
const Blog = require('./Models/Blog');
const Admin = require('./Models/Admin');
require('dotenv').config();

const dbConnectionString = process.env.DB_CONNECTION_STRING;

async function connectToMongo() {
  try {
    await mongoose.connect( dbConnectionString ).then(()=>{console.log("connect to mongodb sucessfull" )})
  } catch (error) {
    console.log("Failed to connect")
  } 
}

module.exports = connectToMongo;