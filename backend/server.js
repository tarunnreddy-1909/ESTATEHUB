// EstateHub backend - simple Express server
const express = require("express");
const cors = require("cors");

const propertyRoutes = require("./routes/propertyRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();
const PORT = 5000;

app.use(cors());          // allow the React app (port 5173) to call this server
app.use(express.json());  // read JSON sent in POST requests

app.get("/", (req, res) => {
  res.json({ message: "EstateHub API is running" });
});

app.use("/api/properties", propertyRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.listen(PORT, () => {
  console.log("EstateHub server running on http://localhost:" + PORT);
});


// with the other require lines at the top:
const authRoutes = require("./routes/authRoutes");

// below app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);