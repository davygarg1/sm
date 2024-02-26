const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Service = require("../Models/Service");
const Staff_model = require("../Models/Staff");


router.get("/staff", async (req, res) => {
      try {

        const Staff = await Staff_model.find({ status:true });
        res.json({ "error" : "false" , Staff });

      } catch (error) {
        return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
      }
    }
  );


router.get("/services", async (req, res) => {
      try {
        const Services = await Service.find({ status:true });
        res.json({ "error" : "false" , Services });

      } catch (error) {
        return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
      }
    }
  );

  
module.exports = router;