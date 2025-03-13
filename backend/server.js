const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const connectDB = require("./lib/db.js");
const dotenv = require('dotenv');
const UserDetails = require("./model/details.model.js");
const cloudinary = require("./lib/cloudinary.js");

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// POST: Create Passenger with File Upload
app.post("/passengers", upload.fields([{ name: "photo" }, { name: "idCard" }]), async (req, res) => {
  
  try {
    const { fullName, age, gender, contact, email } = req.body;
    const photo = req.files["photo"] ? req.files["photo"][0].path : null;
    const idCard = req.files["idCard"] ? req.files["idCard"][0].path : null;

    if (!photo || !idCard) {
      return res.status(400).json({ error: "Both photo and ID card are required." });
    }

    const uploadres = await cloudinary.uploader.upload(photo);
    const idres = await cloudinary.uploader.upload(idCard);
    const idUrl = idres.url;
    const photoUrl = uploadres.url;


    // console.log(photoUrl);
    const newPassenger = await UserDetails.create({
      fullName,
      age,
      gender,
      contact,
      email,
      photo: photoUrl,
      idCard: idUrl,
    });

    res.status(201).json({ message: "Passenger added successfully", passenger: newPassenger });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Retrieve All Passengers
app.get("/passengers", async (req, res) => {
  try {
    const passengers = await UserDetails.find();
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
});

