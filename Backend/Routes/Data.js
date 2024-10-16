const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Treatment = require("../Models/Treatments");
const Doctors = require("../Models/Doctor");
const Sub_Blog = require("../Models/Sub_Blog");
const Blog = require("../Models/Blog");
const Testimonials = require("../Models/Testimonials");
const fetchuser = require('../Middleware/fetchtoken');
const Consultations = require("../Models/Consultations");
const Invoice = require("../Models/Invoice");
const fetchtoken = require("../Middleware/fetchtoken");


router.get('/Invoiceall', fetchtoken, async (req, res) => {
    try {
        // If a user ID is provided in the query, fetch invoices for that user
        const { User } = req.query;

        let invoices;
        if (User) {
            invoices = await Invoice.find({ User }).populate('User');
        } else {
            invoices = await Invoice.find().populate('User');
        }

        res.json(invoices);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get("/Doctor", async (req, res) => {
	try {

		const Doctor = await Doctors.find({ status: true });
		res.json({ "error": "false", Doctor });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Doctorall", async (req, res) => {
	try {

		const Doctor = await Doctors.find({});
		res.json({ "error": "false", Doctor });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Client", async (req, res) => {
	try {

		const Client = await Consultations.find({});
		res.json({ "error": "false", Client });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Blog_data/:id", async (req, res) => {
	try {

		const Blog_data = await Sub_Blog.find({ Blog:req.params.id , status: true });
		res.json({ "error": "false", Blog_data });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Testimonials", async (req, res) => {
	try {

		const Testimonial = await Testimonials.find({ status: true });
		res.json({ "error": "false", Testimonial });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Testimonialsall", async (req, res) => {
	try {

		const Testimonial = await Testimonials.find({});
		res.json({ "error": "false", Testimonial });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Testimonials/:id/:action", fetchuser , async (req, res) => {
	try {

		const userdata = req.data.Userinfo;
		const userId = req.params.id;

		if (userdata.type === "Admin") {

			const check = await Testimonials.findOne({_id:userId});
			if(!check){return res.status(409).json({"error":"true","msg":"Invalid Testimonial"})}
			
			if (req.params.action == "Status") {
				
				const NewUser = { status : !check.status }
				let Data = await Testimonials.findOneAndUpdate({_id:userId},{$set:NewUser},{new:true});
				return res.json({"error":"false","msg":"Testimonial Status Changed"});
				
			} else {

				await Testimonials.findByIdAndDelete({_id : userId});
				return res.json({"error":"false","msg":"Testimonial removed succesfully"});

			}

		}
		return res.json({"error":"true","msg":"Unauthorized access"});


	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Doctor/:id/:action", fetchuser , async (req, res) => {
	try {

		const userdata = req.data.Userinfo;
		const userId = req.params.id;

		if (userdata.type === "Admin") {

			const check = await Doctors.findOne({_id:userId});
			if(!check){return res.status(409).json({"error":"true","msg":"Doctor not found"})}
			
			if (req.params.action == "Status") {
				
				const NewUser = { status : !check.status }
				let Data = await Doctors.findOneAndUpdate({_id:userId},{$set:NewUser},{new:true});
				return res.json({"error":"false","msg":"Doctor Status Changed"});
				
			} else {

				await Doctors.findByIdAndDelete({_id : userId});
				return res.json({"error":"false","msg":"Doctor removed succesfully"});

			}

		}
		return res.json({"error":"true","msg":"Unauthorized access"});


	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/client/:id", fetchuser , async (req, res) => {
	try {

		const userdata = req.data.Userinfo;
		const userId = req.params.id;

		if (userdata.type === "Admin") {

			const check = await Consultations.findOne({_id:userId});
			if(!check){return res.status(409).json({"error":"true","msg":"Invalid Consultations"})}
			
			await Consultations.findByIdAndDelete({_id : userId});
			return res.json({"error":"false","msg":"Consultations removed succesfully"});


		}
		return res.json({"error":"true","msg":"Unauthorized access"});


	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Blog", async (req, res) => {
	try {

		const Blogs = await Blog.find({ status: true });
		res.json({ "error": "false", Blogs });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);

router.get("/Treatments", async (req, res) => {
	try {
		const Treatments = await Treatment.find({ status: true });
		res.json({ "error": "false", Treatments });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}
}
);


module.exports = router;