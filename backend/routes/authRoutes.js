const express = require("express");
const router = express.Router();

// Demo users (in memory)
const users = [
  { id: 1, name: "Tarun", email: "tarun@gmail.com", password: "123456" },
  { id: 2, name: "Admin", email: "admin@estatehub.com", password: "admin123" },
];

// POST /api/auth/signin  -> check email and password
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Sign in successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
});

module.exports = router;