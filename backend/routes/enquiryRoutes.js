const express = require("express");
const router = express.Router();

// Enquiries are stored in memory (they reset when the server restarts)
const enquiries = [];

// POST /api/enquiries  -> save a new enquiry
router.post("/", (req, res) => {
  const { name, email, phone, property, purpose, message } = req.body;

  if (!name || !email || !phone || !property || !purpose || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const enquiry = {
    id: enquiries.length + 1,
    name,
    email,
    phone,
    property,
    purpose,
    message,
  };
  enquiries.push(enquiry);
  console.log("New enquiry received:", enquiry);

  res.status(201).json({ message: "Enquiry submitted successfully", enquiry });
});

// GET /api/enquiries  -> only for demo, to show saved enquiries
router.get("/", (req, res) => {
  res.json(enquiries);
});

module.exports = router;
