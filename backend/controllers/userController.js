import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';

dotenv.config();

// Create a token with expiration
const createToken = (id, expiresIn = '1h') => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

// Hash password using crypto
const hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) return reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
};

// Generate a salt
const generateSalt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buffer) => {
            if (err) return reject(err);
            resolve(buffer.toString('hex'));
        });
    });
};

// Verify password
const verifyPassword = async (password, hashedPassword) => {
    const [salt, key] = hashedPassword.split(':');
    const hashedBuffer = await hashPassword(password, salt);
    return hashedBuffer === key;
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email address" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await generateSalt();
        const hashedPassword = `${salt}:${await hashPassword(password, salt)}`;

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generate OTP
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        
        // Save OTP and its expiration time
        user.otp = otp;
        user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save();

        // Configure nodemailer directly in the function
        const transporter = nodemailer.createTransport({
            host: 'mail.panachebyfunmi.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.OUTLOOK_EMAIL,
                pass: process.env.OUTLOOK_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Generate the email content
        const mailOptions = {
            from: process.env.OUTLOOK_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`,
        };

        // Send the OTP email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Error sending OTP' });
    }
};

// Verify OTP and reset password
const verifyOtpAndResetPassword = async (req, res) => {
    console.log("Request received");
    const { email, otp, newPassword } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check OTP validity
        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        // Hash the new password
        const salt = await generateSalt();
        const hashedPassword = `${salt}:${await hashPassword(newPassword, salt)}`;

        // Update user's password and clear OTP
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error('Error resetting password:', error);
        console.log(req.headers)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { loginUser, forgotPassword, verifyOtpAndResetPassword, registerUser };
