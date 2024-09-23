require('dotenv').config();
const connectToMongo = require('./Database');
const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
const { createServer } = require('node:http');
const app = express()
const auth = require('./Routes/Auth')
const Data = require('./Routes/Data')
const consultation = require('./Routes/Consultations')
const Admin = require('./Routes/Admin')
const socketIo = require('socket.io');
const port = process.env.PORT
const server = createServer(app);

connectToMongo();

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());


const io = socketIo(server, {
	cors: {
		origin: "*", // Allow all origins
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
		credentials: true
	}
});

io.on('connection', (socket) => {

	socket.on('send_message', async (msg) => {
		io.emit('receive_message', msg); // Use io.emit to broadcast to all clients
		const body = { body: msg, room: "all" };
		await Messages.create(body);
	});

	socket.on("Join_room", (data) => {
		socket.join(data);
	});

	socket.on('send_message_psn', async (data) => {
		io.in(data.Room).emit('receive_message_psn', data.Message);
		const body = { body: data.Message, room: data.roomId, user: data.Room.split('_')[0] } // Broadcast to all in the room, including sender
		await Messages.create(body);
	});

	socket.on('disconnect', () => {
	});
});

app.use('/api/auth', auth);
app.use('/api/admin', Admin);
app.use('/api/Data', Data);
app.use('/api/consultation', consultation);

app.get('/', (req, res) => {
	res.send('Hello welcome!')
})

server.listen(port, () => {
	console.log(`Example app listening http://localhost:${port}`)
})