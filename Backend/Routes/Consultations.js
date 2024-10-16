const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Consultation = require("../Models/Consultations");
const Treatments = require("../Models/Treatments");
const Testimonials = require("../Models/Testimonials");
const Mail = require('../Services/Mail');
const MailC = require('../Services/MailC');
const MailS = require('../Services/MailS');
const fs = require('fs');
const path_book = '../Backend/Services/Mail_Tamplates/Consultation_book.html';
const fetchuser = require('../Middleware/fetchtoken');
const limiter = require('../Middleware/limiter')
const pug = require('pug');
const htmlPdf = require('html-pdf'); // To generate PDF
const path = require('path');
const Invoice = require("../Models/Invoice");


function Mailsendstatus(Status, Data) {

	if (Status == 1) {

		fs.readFile(path_book, 'utf8', (err, data) => {
			if (err) {
				console.error('Error reading HTML file:', err);
			} else if (Data.email) {
				const mail_data = {};
				mail_data.to = Data.email;
				mail_data.from = "secure.services@samarpitam.com";
				mail_data.head = "Samarpitam";
				mail_data.subject = "Consultation booking intialized";
				mail_data.html = data;
				Mail(mail_data);
			};
		});

	} else if (Status == 2 && Data.email) {
		const mail_data = {};
		mail_data.to = Data.email;
		mail_data.from = "secure.services@samarpitam.com";
		mail_data.head = "Samarpitam";
		mail_data.subject = "Payment Received For Consultation Booking";
		mail_data.html =
			`<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Payment Received - Thank You</title>
		</head>
		<body style="font-family: Arial, sans-serif;">
		
			<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
				<h2 style="text-align: center; color: #007bff;">Payment Received - Thank You!</h2>
				
				<p>Dear valued customer,</p>
		
				<p>We are writing to inform you that we have received your payment for consultations booking on Samarpitam. We truly appreciate your trust in our services.</p>
		
				<p>Your booking has been confirmed, and our team will be in touch with you shortly to schedule your consultation appointment.</p>
		
				<p>If you have any questions or need further assistance, please feel free to contact us at support@samarpitam.com.</p>
		
				<p>Once again, thank you for choosing Samarpitam for your consultation needs.</p>
		
				<p>Best regards,<br>
				The Samarpitam Team</p>
			</div>
		
		</body>
		</html>`;
		Mail(mail_data);

	} else if (Status == 3 && Data.email) {
		function convertTodate(timestamp) {
			const date = new Date(timestamp);
			const istOffset = 5.5 * 60 * 60 * 1000;
			const istDate = new Date(date.getTime() + istOffset);
			return istDate.toLocaleString();
		}
		const mail_data = {};
		mail_data.to = Data.email;
		mail_data.from = "consultation@samarpitam.com";
		mail_data.head = "Samarpitam";
		mail_data.subject = "Appointment booked";
		mail_data.html = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Appointment Booked - Thank You</title>
		</head>
		<body style="font-family: Arial, sans-serif;">
		
			<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
				<h2 style="text-align: center; color: #007bff;">Appointment Booked - Thank You!</h2>
				
				<p>Dear valued customer,</p>
		
				<p>We are pleased to inform you that your appointment has been successfully booked with us at the following date:</p>
		
				<p><strong>Date:</strong> ${convertTodate(Data.slot)}</p>
		
				<p>We appreciate your trust in our services and look forward to meeting with you.</p>
		
				<p>If you have any questions or need to reschedule, please feel free to contact us at support@samarpitam.com.</p>
		
				<p>Thank you once again for choosing Samarpitam for your consultation needs.</p>
		
				<p>Best regards,<br>
				The Samarpitam Team</p>
			</div>
		
		</body>
		</html>`;
		MailC(mail_data);

	} else if (Status == 4 && Data.email) {
		const mail_data = {};
		mail_data.to = Data.email;
		mail_data.from = "support@samarpitam.com";
		mail_data.head = "Samarpitam";
		mail_data.subject = "Consultation booking intialized";
		mail_data.html = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Consultation Completed - Thank You</title>
		</head>
		<body style="font-family: Arial, sans-serif;">
		
			<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
				<h2 style="text-align: center; color: #007bff;">Consultation Completed - Thank You!</h2>
				
				<p>Dear valued customer,</p>
		
				<p>We are pleased to inform you that your consultation has been successfully completed with us.</p>
				
				<p>We sincerely appreciate your trust in our services. Your satisfaction is very important to us.</p>
		
				<p>As part of our commitment to continuous improvement, we would greatly appreciate it if you could take a moment to rate your experience with us.</p>
		
				<p>Your feedback helps us enhance our services and better serve.</p>
		
				<p>Additionally, we wish you a healthy and fulfilling life. Your well-being is our utmost priority.</p>
		
				<p>If you have any further questions or need additional assistance, please don't hesitate to contact us at support@samarpitam.com.</p>
		
				<p>Thank you once again for choosing Samarpitam for your consultation needs. We look forward to serving you again in the future.</p>
		
				<p>Best regards,<br>
				The Samarpitam Team</p>
			</div>
		
		</body>
		</html>`;
		MailS(mail_data);

	}
}

router.post("/Book",
	body("name", "name min 3 length").isLength({ min: 3 }),
	body("phone", "Invaild Phone number").isLength({ min: 10, max: 10 }).isNumeric().isMobilePhone(),
	body("email", "Enter a vaild email").optional().isEmail(),
	limiter,
	async (req, res) => {
		try {

			// checking user input fileds

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
			}

			//  collect data form server 

			const { name, phone, DOB, service, email, userid, massage } = req.body;
			const booking_data = { name, phone, DOB };
			if (email) { booking_data.email = email }
			if (userid) { booking_data.user = userid }
			if (massage) { booking_data.massage = massage }
			let Doctor = false;

			// checking user allready exist or not

			const finduserexist = await Consultation.findOne({ phone: phone, active: true });
			if (finduserexist) {
				return res.status(409).json({ "error": "Ture", "msg": "Consultation booking already exist" });
			}

			// checking service is active now or not

			const Treatments_check = await Treatments.findOne({ _id: service });
			if (Treatments_check) {
				booking_data.service = Treatments_check._id;
				booking_data.servicename = Treatments_check.name;
			}

			// book Consultation in mongodb

			const booking_details = await Consultation.create(booking_data);

			function convertTodate(timestamp) {
				const date = new Date(timestamp);
				const istOffset = 5.5 * 60 * 60 * 1000;
				const istDate = new Date(date.getTime() + istOffset);
				return istDate.toLocaleString();
			}

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
					Mail(mail_data);
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
						<li><strong>DOB:</strong> ${new Date(booking_details.DOB).toLocaleDateString()}</li>
						<li><strong>Treatment:</strong> ${Treatments_check ? Treatments_check.name : "Not define"}</li>
						<li><strong>Doctor:</strong> ${Doctor ? Doctor.name : "Not define"}</li>
						<li><strong>Message:</strong> ${booking_details?.massage}</li>
						<li><strong>Slot:</strong> ${booking_details.slot ? convertTodate(booking_details.slot) : "Not Booked"}</li>
						<li><strong>Status:</strong> ${booking_details.status}</li>
						<li><strong>Terms and Conditions:</strong>Agree</li>
						<li><strong>Book At:</strong> ${convertTodate(booking_details.createdAt)}</li>
						<li><strong>Updated At:</strong> ${convertTodate(booking_details.updatedAt)}</li>
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

			Mail(mail_data);


			res.json({ "error": "false", booking_details });

		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
	});

router.get("/status/:phone",
	async (req, res) => {
		try {

			let Data = await Consultation.find({ phone: req.params.phone, active: true });
			if (Data.length > 0) {
				res.json({ "error": "false", Data })
			} else {
				res.json({ "error": "true", "msg": "Record not found" });
			}

		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
	});

router.post("/Testimonial",
	body("name", "name min 3 length").isLength({ min: 3 }),
	body("star", "Invaild Rating").isLength({ min: 1, max: 1 }).isNumeric(),
	limiter,
	async (req, res) => {
		try {

			// checking user input fileds

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
			}

			//  collect data form server 

			const { name, star, massage, userid } = req.body;
			const Testimonial_data = { name, star };
			if (userid) { Testimonial_data.user = userid }
			if (massage) { Testimonial_data.massage = massage }

			let Data = await Testimonials.create(Testimonial_data);

			res.json({ "error": "false", Data })

		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
	});

router.post("/Consultations_update/",
	body("Status", "Invaild Status").isString(),
	fetchuser, async (req, res) => {
		try {

			// checking user input fileds

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
			}

			const userdata = req.data.Userinfo;

			if (userdata.type === "Admin") {

				var { name, email, phone, slot, Status, treatment, id } = req.body;

				const check = await Consultation.findOne({ _id: id });
				if (!check) { return res.status(409).json({ "error": "true", "msg": "Invalid Consultation" }) }

				const NewUser = {}
				if (name) { NewUser.name = name }
				if (email) { NewUser.email = email }
				if (phone) { NewUser.phone = phone }
				if (treatment) { NewUser.servicename = treatment }
				if (Status == 1) { NewUser.status = "booking intialized" }
				if (Status == 2) { NewUser.status = "Payment Received" }
				if (Status == 3) { NewUser.status = "Slot confirmed", NewUser.slot = slot }
				if (Status == 4) { NewUser.status = "Consultation completed", NewUser.active = false }


				let Data = await Consultation.findOneAndUpdate({ _id: id }, { $set: NewUser }, { new: true });
				Mailsendstatus(Status, Data);
				return res.json({ "error": "false", "msg": "Consultation Status Changed", Data });

			}

			return res.json({ "error": "true", "msg": "Unauthorized access" });


		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
	});

// Route to send invoice
router.post('/send_invoice',fetchuser, [
    // Validation rules
    body('id').notEmpty().withMessage('Consultation ID is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('payment').notEmpty().withMessage('Payment method is required'),
    body('treatment').notEmpty().withMessage('Treatment details are required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('email').isEmail().withMessage('A valid email is required') // Email validation
],  async (req, res) => {

	try {

		 // Check for validation errors
		 const errors = validationResult(req);
		 if (!errors.isEmpty()) {
			 return res.status(400).json({ errors: errors.array() });
		 }
		 
		const { id, amount, payment, treatment, address , email } = req.body;
		const consultationId = id;

		// Fetch consultation details
		const consultation = await Consultation.findById(consultationId);

		if (!consultation) {
			return res.status(404).json({ "error": "true", "msg": 'Consultation not found' });
		}

		const Invoiceres = await Invoice.create({ amount, payment, treatment, address, email, 'User':consultationId });

		// Render invoice template using Pug (or any template engine)
		const invoiceHtml = pug.renderFile(path.join(__dirname, '../Services/Mail_Tamplates/invoice.pug'), {
			consultation: consultation,
			currentDate: new Date().toLocaleDateString(),
			payment, treatment, Invoiceres, address,
			totalAmount: amount, // Dynamically calculated total amount
		});

		// Path to save the PDF
        const pdfPath = path.join(__dirname, `../invoices/invoice_${consultation._id}.pdf`);

		// Generate PDF from the rendered HTML
		htmlPdf.create(invoiceHtml, { format: 'A4' }).toFile(pdfPath, async (err, pdf) => {
			if (err) {
				console.error('Error generating PDF:', err);
				return res.status(500).json({ message: 'Error generating PDF' });
			}

			// If email is available, send the email with invoice
			if (consultation) {
				const mail_data = {
					to: consultation.email || email || "SamarpitamChikitsalaya@gmail.com",
					cc: ["SamarpitamChikitsalaya@gmail.com"],
					from: "consultation@samarpitam.com",
					head: "Samarpitam Chikitsalaya",
					subject: `Invoice for Consultation on Samarpitam`,
					html: invoiceHtml,
					attachments: [
						{
							filename: `invoice_${consultation._id}.pdf`, // Attach invoice in PDF format
							path: pdfPath,
							contentType: 'application/pdf',
						},
					],
				};

				// Send email via MailC
				let mailinfo =  await MailC(mail_data);

				 // Delete the PDF file after sending the email
				 fs.unlink(pdfPath, (unlinkErr) => {
					if (unlinkErr) {
						console.error('Error deleting PDF file:', unlinkErr);
					}
				});

				if (mailinfo.sent) {			
					return res.status(200).json({ "error": "false", "msg": 'Invoice sent successfully!', 'info':mailinfo.info });
				} else {
					return res.status(200).json({ "error": "false", "msg": 'Invoice sent successfully!', 'info':mailinfo.error });
				}

			} else {
				return res.status(400).json({ "error": "true", "msg": 'No consultation provided' });
			}

		});

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": 'Error sending invoice' });
	}
});

// Route to resend invoice with invoice ID in the URL
router.get('/resend_invoice/:invoiceId', fetchuser, async (req, res) => {

    try {
        const { invoiceId } = req.params; // Get invoiceId from the URL

        // Fetch the invoice by ID
        const Invoiceres = await Invoice.findById(invoiceId).populate('User');

        if (!Invoiceres) {
            return res.status(404).json({ "error": "true", "msg": 'Invoice not found' });
        }

        // Render invoice template using Pug (or any template engine)
        const invoiceHtml = pug.renderFile(path.join(__dirname, '../Services/Mail_Tamplates/invoice.pug'), {
			consultation: Invoiceres.User,
			currentDate: new Date().toLocaleDateString(),
			Invoiceres,
			totalAmount: Invoiceres.amount,
			payment: Invoiceres.payment, 
            treatment: Invoiceres.treatment, 
			address: Invoiceres.address,
        });

        // Path to save the PDF
        const pdfPath = path.join(__dirname, `../invoices/invoice_${Invoiceres.User._id}.pdf`);

        // Generate PDF from the rendered HTML
        htmlPdf.create(invoiceHtml, { format: 'A4' }).toFile(pdfPath, async (err, pdf) => {
            if (err) {
                console.error('Error generating PDF:', err);
                return res.status(500).json({ message: 'Error generating PDF' });
            }

            // Prepare the email data
            const mail_data = {
                to: Invoiceres.email || "SamarpitamChikitsalaya@gmail.com",
                cc: ["SamarpitamChikitsalaya@gmail.com"],
                from: "consultation@samarpitam.com",
                head: "Samarpitam Chikitsalaya",
                subject: `Resent Invoice for Consultation on Samarpitam`,
                html: invoiceHtml,
                attachments: [
                    {
                        filename: `invoice_${Invoiceres.User._id}.pdf`, // Attach invoice in PDF format
                        path: pdfPath,
                        contentType: 'application/pdf',
                    },
                ],
            };

            // Send email via MailC
            let mailinfo = await MailC(mail_data);

			 // Delete the PDF file after sending the email
			 fs.unlink(pdfPath, (unlinkErr) => {
				if (unlinkErr) {
					console.error('Error deleting PDF file:', unlinkErr);
				}
			});

            if (mailinfo.sent) {			
                return res.status(200).json({ "error": "false", "msg": 'Invoice resent successfully!', 'info': mailinfo.info });
            } else {
                return res.status(500).json({ "error": "true", "msg": 'Error sending email', 'info': mailinfo.error });
            }
        });

    } catch (error) {
        return res.status(500).json({ "error": error.message, "msg": 'Error resending invoice' });
    }
});


module.exports = router;