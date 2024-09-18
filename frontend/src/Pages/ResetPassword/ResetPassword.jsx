import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../../Context/ShopContext';
import "./ResetPassword.css";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);



const ResetPassword = () => {
    const { url } = useContext(ShopContext);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userMessage, setUserMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "otp") setOtp(value);
        if (name === "newPassword") setNewPassword(value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateEmail(email)) {
            setUserMessage({ text: 'Please enter a valid email address.', type: 'error' });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(url + '/api/user/reset-password', {
                email: email.trim(),
                otp: otp.trim(),
                newPassword: newPassword.trim(),
            }, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                }
            });
            setLoading(false);

            if (response.data.success) {
                setUserMessage({ text: 'Password has been successfully reset.', type: 'success' });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setUserMessage({ text: response.data.message || 'Password reset failed.', type: 'error' });
            }
        } catch (error) {
            setLoading(false);
            setUserMessage({ text: 'Error occurred while resetting password.', type: 'error' });
            console.error('Reset password error:', error.response ? error.response.data : error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <div className="reset-password">
            <form onSubmit={onSubmitHandler} className="reset-password-container">
                <h1>Reset Password</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={email}
                    onChange={onChangeHandler}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={onChangeHandler}
                    required
                    className="input-field"
                />
                <div className="password-container">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={onChangeHandler}
                        required
                        className="input-field"
                    />
                    <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </button>
                </div>
                <button className="reset-button" type="submit" disabled={loading}>
                    {loading ? <div className="loading-indicator"></div> : "Reset Password"}
                </button>

                {userMessage && <div className={`user-message ${userMessage.type}`}>{userMessage.text}</div>}
            </form>
        </div>
    );
};

export default ResetPassword;
