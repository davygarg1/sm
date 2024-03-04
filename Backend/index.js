const connectToMongo = require('./Database');
const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const auth = require('./Routes/Auth')
const Data = require('./Routes/Data')
const consultation = require('./Routes/Consultations')
const Admin = require('./Routes/Admin')
require('dotenv').config();
const port = process.env.PORT

connectToMongo();

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());

app.use('/api/auth',auth);
app.use('/api/admin',Admin);
app.use('/api/Data',Data);
app.use('/api/consultation',consultation);

app.get('/' , (req, res) => {
  res.send('Hello welcome!')
})

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})