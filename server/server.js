const express = require("express");
const cors = require("cors");
const pool = require("./database");
const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, phoneNumber, foundUs, jobTitle, company, domain, linkedin } = req.body;
    try {
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, phone_number, found_us, job_title, company, domain, linkedin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [firstName, lastName, email.toLowerCase(), phoneNumber, foundUs, jobTitle, company, domain, linkedin]
        );
        res.json({ message: "User signed up successfully", data: newUser.rows[0] });
    } catch (err) {
        if (err.code === '23505') {  // Unique violation error code
            res.status(400).json({ message: "Email or phone number already exists" });
        } else {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
});

app.post("/setusernamepassword", async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const updatedUser = await pool.query(
            "UPDATE users SET username = $1, password = $2 WHERE email = $3 RETURNING *",
            [username, password, email.toLowerCase()]
        );

        // Generate a confirmation token
        const confirmationToken = Math.random().toString(36).substring(2);

        // Save the confirmation token to the database
        await pool.query(
            "UPDATE users SET confirmation_token = $1 WHERE email = $2",
            [confirmationToken, email.toLowerCase()]
        );

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Confirmation',
            text: `Please confirm your email by clicking the following link: http://localhost:4000/confirm/${confirmationToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });

        res.json({ message: "Username and password set successfully. Please check your email for confirmation.", data: updatedUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.get("/confirm/:token", async (req, res) => {
    const { token } = req.params;
    try {
        const result = await pool.query(
            "UPDATE users SET confirmed = true WHERE confirmation_token = $1 RETURNING *",
            [token]
        );
        if (result.rowCount === 0) {
            res.status(400).send("Invalid token");
        } else {
            res.send("Email confirmed successfully. You can now sign in.");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email.toLowerCase(), password]);
        if (user.rows.length > 0) {
            if (user.rows[0].confirmed) {
                res.json({ success: true });
            } else {
                res.status(403).json({ success: false, message: 'Email not confirmed. Please check your email for the confirmation link.' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Sign-in error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
