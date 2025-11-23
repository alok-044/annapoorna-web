const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(cors()); // Allows frontend to talk to backend
app.use(express.json()); // Allows us to read JSON data

// Database Connection (PostgreSQL)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test Route
app.get("/", (req, res) => {
  res.send("Annapoorna Backend is Running!");
});

// --- AUTHENTICATION ROUTES ---

// 1. REGISTER USER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    // Check if user exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password (Security Best Practice)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into DB
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash, role, phone, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, hashedPassword, role, phone, address]
    );

    res.json({ message: "Registration successful!", user: newUser.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. LOGIN USER
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.rows[0].id}:${Date.now()}`).toString('base64');

    // Return user data and token
    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
        phone: user.rows[0].phone,
        address: user.rows[0].address
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ... (after your /api/auth/login route) ...

// 3. GET ALL NGOs (RECEIVERS) FOR THE MAP
app.get("/api/ngo/list", async (req, res) => {
  try {
    const ngoList = await pool.query(
      "SELECT id, name, address, latitude, longitude FROM users WHERE role = 'receiver' AND is_verified = TRUE"
    );

    res.json(ngoList.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Newsletter subscription endpoint
const fs = require('fs');
const path = require('path');
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const storePath = path.join(__dirname, 'subscribers.json');
    let list = [];
    try {
      if (fs.existsSync(storePath)) {
        const raw = fs.readFileSync(storePath, 'utf8');
        list = raw ? JSON.parse(raw) : [];
      }
    } catch (e) {
      console.error('Failed reading subscribers file', e);
    }

    // avoid duplicates
    if (!list.includes(email)) list.push(email);

    try {
      fs.writeFileSync(storePath, JSON.stringify(list, null, 2));
    } catch (e) {
      console.error('Failed writing subscribers file', e);
    }

    console.log('New newsletter subscription:', email);
    res.json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});