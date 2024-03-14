const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Treatment = require("../Models/Treatments");
const Doctors = require("../Models/Doctor");
const Sub_Blog = require("../Models/Sub_Blog");
const Blog = require("../Models/Blog");
const Testimonials = require("../Models/Testimonials");

router.get("/Doctor", async (req, res) => {
	try {

		const Doctor = await Doctors.find({ status: true });
		res.json({ "error": "false", Doctor });

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