import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    otp: { type: String, default: null }, // Field for OTP
    otpExpires: { type: Date, default: null }, // Field for OTP expiry date
    resetToken: { type: String },  // Field for the reset token
    resetTokenExpiry: { type: Date }  // Field for the token expiry date
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
