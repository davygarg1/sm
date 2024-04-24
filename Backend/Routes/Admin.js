const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Treatments = require("../Models/Treatments");
const Doctor = require("../Models/Doctor");
const Blog = require("../Models/Blog");
var jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


router.post("/Treatments",
    body("name", "name min 3 length").isLength({ min: 3 }),
    body("description", "description is req").isLength({ min: 3 }).isString(),
    body("user", "user not vaild").isLength({ min: 3 }).isString(),
    body("url", "url not vaild").isString(),
    body("status", "status is req").isBoolean(),
    async (req, res) => {
        try {

            // checking user input fileds

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
            }

            //  collect data form server 

            const { name, user, url, description, status } = req.body;
            const Testimonial_data = { name, user, url, description, status };

            let Data = await Treatments.create(Testimonial_data);

            res.json({ "error": "false", Data })

        } catch (error) {
            return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
        }
    });

router.post("/Blog",
    body("name", "name min 3 length").isLength({ min: 3 }),
    body("description", "description is req").isLength({ min: 3 }).isString(),
    body("url", "url not vaild").isString(),
    body("status", "status is req").isBoolean(),
    async (req, res) => {
        try {

            // checking user input fileds

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
            }

            //  collect data form server 

            const { name, url, description, status } = req.body;
            const Testimonial_data = { name, url, description, status };

            let Data = await Blog.create(Testimonial_data);

            res.json({ "error": "false", Data })

        } catch (error) {
            return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
        }
    });

router.post(
    "/Register",
    body("name", "name min 3 length").isLength({ min: 3 }),
    body("email", "Enter a vaild email").optional().isEmail(),
    body("description", "description is req").isLength({ min: 3 }).isString(),
    body("study", "study is req").isString(),
    body("star", "star rating").isNumeric(),
    body("experience", "experience").isNumeric(),
    body("status", "status is req").isBoolean(),
    body("url", "url not vaild").isString(),
    body("password", "password should be atleast 5 length").isLength({ min: 5 }),
    async (req, res) => {
        try {

            // checking user input fileds

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ ValidationErrors: errors.array(), "error": "True", "msg": "Syntax error" });
            }

            //  checking not req fileds

            const { name, email, description, study, star, experience, status, url } = req.body;
            const NewUser = { name, email, description, study, star, experience, status, url };

            // checking user allready exist or not

            const finduserexist = await Doctor.findOne({ email: req.body.email });
            if (finduserexist) {
                return res.status(409).json({ "error": "Ture", "msg": "sorry user with this email already exist" });
            }

            // hashing password

            await bcrypt.genSalt(10, async function (err, salt) {
                await bcrypt.hash(req.body.password, salt, async function (_err, hash) {
                    // Store hash in your password DB.
                    NewUser.password = hash;
                    const user = await Doctor.create(NewUser);
                    // create token for a user
                    const data = {
                        Userinfo: {
                            id: user.id,
                        },
                    };
                    const token = jwt.sign(data, JWT_SECRET);
                    res.json({ "error": "false", token });
                });
            });
        } catch (error) {
            return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
        }
    });


module.exports = router;