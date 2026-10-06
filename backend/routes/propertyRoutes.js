const express = require("express");
const router = express.Router();
const properties = require("../data/properties");

// GET /api/properties  -> all properties
router.get("/", (req, res) => {
  res.json(properties);
});

// GET /api/properties/:id  -> one property
router.get("/:id", (req, res) => {
  const property = properties.find((p) => p.id === Number(req.params.id));
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }
  res.json(property);
});

module.exports = router;
