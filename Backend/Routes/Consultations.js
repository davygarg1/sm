const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Consultation = require("../Models/Consultations");
const Service = require("../Models/Service");
const Staff = require("../Models/Staff");
const mail = require('../Services/Mail');
const fs = require('fs');
const path_book = '../Backend/Services/Mail_Tamplates/Consultation_book.html';

router.post("/Book",
	body("name", "name min 3 length").isLength({ min: 3 }),
	body("phone", "Invaild Phone number").isLength({ min: 10, max: 10 }).isNumeric().isMobilePhone(),
	body("age", "Invaild age").isNumeric(),
	body("email", "Enter a vaild email").isEmail(),
	async (req, res) => {
		try {

			// checking user input fileds

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
			}

			//  collect data form server 

			const { name, phone, age, service, email, userid } = req.body;
			const booking_data = { name, phone, age };
			if (email) { booking_data.email = email }
			if (userid) { booking_data.user = userid }
			let Doctor = false;

			// checking user allready exist or not

			const finduserexist = await Consultation.findOne({ phone: phone });
			if (finduserexist) {
				return res.status(409).json({ "error": "Ture", "msg": "Consultation booking already exist" });
			}

			// checking service is active now or not

			const service_check = await Service.findOne({ _id: service });
			if (service_check && service_check.status == false) {
				Doctor = await Staff.findOne({ _id: service_check.user });
				booking_data.service = service;
			}

			// book Consultation in mongodb

			const booking_details = await Consultation.create(booking_data);

			//  if got email then send email 

			fs.readFile(path_book, 'utf8', (err, data) => {
				if (err) {
					console.error('Error reading HTML file:', err);
				} else if (email) {
					const mail_data = {};
					mail_data.to = email;
					mail_data.from = "secure.services@samarpitam.com";
					mail_data.head = "Samarpitam";
					mail_data.subject = "Consultation booking intialized";
					mail_data.html = data;
					mail(mail_data);
				};
			});

			const mail_data = {};
			mail_data.to = "samarpitamchikitsalaya@gmail.com";
			mail_data.from = "secure.services@samarpitam.com";
			mail_data.head = "Samarpitam";
			mail_data.subject = "New Consultation booking Detailes";

			// Format booking details into HTML
			const htmlContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Health Consultation Booking Initialized</title>
				<style>
					body {
						font-family: Arial, sans-serif;
						margin: 0;
						padding: 0;
						background-color: #f4f4f4;
					}
					.container {
						max-width: 600px;
						margin: 20px auto;
						padding: 20px;
						background-color: #fff;
						border-radius: 8px;
						box-shadow: 0 0 10px rgba(0,0,0,0.1);
					}
					h1 {
						color: #333;
						text-align: center;
					}
					p {
						color: #555;
						font-size: 16px;
						line-height: 1.6;
					}
					.button {
						display: inline-block;
						padding: 10px 20px;
						background-color: #007bff;
						color: #fff;
						text-decoration: none;
						border-radius: 5px;
						margin-top: 20px;
					}
					.button:hover {
						background-color: #0056b3;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1>New Health Consultation Booking Initialized</h1>
					<p>Hello User,</p>
					<p>health consultation booking has been initialized successfully.</p>
					<p>Appointment Details:</p>
					<ul>
						<li><strong>Name:</strong> ${booking_details.name}</li>
						<li><strong>Phone:</strong> ${booking_details.phone}</li>
						<li><strong>Email:</strong> ${booking_details.email}</li>
						<li><strong>Age:</strong> ${booking_details.age}</li>
						<li><strong>Service:</strong> ${booking_details.service = "65da46c4340b35d4ec336cfa" ? "Not define" : service_check.name}</li>
						<li><strong>Doctor:</strong> ${Doctor ? Doctor.name : "Not define"}</li>
						<li><strong>Status:</strong> ${booking_details.status}</li>
						<li><strong>Created At:</strong> ${booking_details.createdAt}</li>
						<li><strong>Updated At:</strong> ${booking_details.updatedAt}</li>
					</ul>
					<p>Please ensure that you call on time for fix appointment with user. If you need to cancel or reschedule, kindly inform us at least 24 hours in advance.</p>
					<p>For any inquiries or assistance, feel free to contact Dr. Sumeet Saini.</p>
					<p>Thank you for choosing our services.</p>
					<br>
					<br>
					<p>Best regards,</p>
					<p>The Samarpitam Team</p>
				</div>
			</body>
			</html>


			`;

			mail_data.html = htmlContent;

			mail(mail_data);


			res.json({ "error": "false", booking_details });

		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
	}
);

router.post("/Update",
	body("phone", "Invaild Phone number").isLength({ min: 10, max: 10 }).isNumeric().isMobilePhone(),
	body("slot", "Invaild Date").isDate(),
	async (req, res) => {
		try {

			// checking user input fileds

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
			}

			const { phone, service, slot, status } = req.body;
			const slot_data = { slot, status };
			if (service) { slot_data.service = service }


			//  update slot of user


			let Data = await Consultation.findOneAndUpdate({ phone: phone }, { $set: slot_data }, { new: true });
			let Doctor = false;
			const service_check = await Service.findOne({ _id: Data.service });
			if (service_check && service_check.status == false) {
				Doctor = await Staff.findOne({ _id: service_check.user });
			}


			// Create a new Date object using the slot timestamp
			const slotDate = new Date(Data.slot);

			// Get the date components
			const year = slotDate.getFullYear();
			const month = slotDate.getMonth() + 1; // January is 0, so we add 1
			const day = slotDate.getDate();

			// Get the time components
			const hours = slotDate.getHours();
			const minutes = slotDate.getMinutes();
			const seconds = slotDate.getSeconds();


			if (Data.email) {
				const mail_data = {};
				mail_data.to = Data.email, "samarpitamchikitsalaya@gmail.com";
				mail_data.from = "secure.services@samarpitam.com";
				mail_data.head = "Samarpitam";
				mail_data.subject = "Consultation booking Detailes";

				// Format booking details into HTML
				const htmlContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Consultation Slot Booking Confirmation</title>
			</head>
			<body style="font-family: Arial, sans-serif;">

				<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
					
					<h2>Consultation Slot Booking Confirmation</h2>

					<p>Dear [User's Name],</p>

					<p>Your consultation slot has been successfully booked. Here are the details:</p>

					<ul>
						<li><strong>User:</strong>${Data.name}</li>
						<li><strong>Slot:</strong></li>
						<li><strong>Date:</strong>${year}-${month}-${day}</li>
						<li><strong>Time:</strong>${hours}:${minutes}:${seconds}</li>
						<li><strong>Consultant:</strong>${Doctor ? Doctor.name : "Not define"}</li>
						<li><strong>Consultation Type:</strong>Online Phone Call</li>
					</ul>

					<p>Please make sure to arrive on time for your consultation appointment.</p>

					<p>Should you have any questions or need to reschedule, please contact us at 9815209389.</p>

					<p>Thank you for choosing our services!</p>

					<p>Best regards,<br>
					The Samarpitam Team</p>

				</div>

			</body>
			</html>



			`;

				mail_data.html = htmlContent;

				mail(mail_data);
			}
			res.json({ "error": false, Data })
		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
	});

router.get("/status/:phone",
	async (req, res) => {
		try {

			let Data = await Consultation.find({ phone: req.params.phone });
			if (Data.length > 0) {
				res.json({ "error": false, Data })
			} else {
				res.json({ "error": true, "msg":"Record not found" });
			}

		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
	});


module.exports = router;