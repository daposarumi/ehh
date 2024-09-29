import React, { useState, useContext, useEffect } from 'react';
import "./LoginSignup.css";
import { useNavigate, Link } from 'react-router-dom'; 
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const LoginSignup = ({ setShowLogin, initialState = "Sign Up" }) => {
    const { url, setToken } = useContext(ShopContext);
    const [currState, setCurrState] = useState(initialState);
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userMessage, setUserMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false); // New state for OTP loading
    const navigate = useNavigate(); 

    useEffect(() => {
        setCurrState(initialState);
    }, [initialState]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateEmail(data.email)) {
            setUserMessage({ text: 'Please enter a valid email address.', type: 'error' });
            setLoading(false);
            return;
        }

        const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
        const successMessage = currState === "Login" ? "Login successful" : "Sign Up successful";

        try {
            const response = await axios.post(`${url}${endpoint}`, data);
            setLoading(false);

            if (response.data.success) {
                if (currState === "Login") {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setUserMessage({ text: successMessage, type: "success" });

                    // Close the modal and navigate to the home page
                    setTimeout(() => {
                        setShowLogin(false);
                        navigate('/');
                    }, 2000);
                } else {
                    setUserMessage({ text: successMessage, type: "success" });
                    setTimeout(() => {
                        setCurrState("Login");
                        setUserMessage(null);
                    }, 2000);
                }
            } else {
                setUserMessage({ text: `${currState} unsuccessful`, type: "error" });
            }
        } catch (error) {
            setLoading(false);
            setUserMessage({ text: `Error during ${currState.toLowerCase()}`, type: "error" });
            console.error(`${currState} error:`, error.response ? error.response.data : error.message);
        }
    };

    const onForgotPassword = async () => {
        if (!validateEmail(data.email)) {
            setUserMessage({ text: 'Please enter a valid email address to request an OTP.', type: 'error' });
            return;
        }

        setOtpLoading(true); // Set OTP loading state

        try {
            const response = await axios.post(`${url}/api/user/forgot-password`, { email: data.email });
            setOtpLoading(false); // Reset OTP loading state

            if (response.data.success) {
                setUserMessage({ text: 'OTP has been sent to your email.', type: 'success' });
                setTimeout(() => {
                    setShowLogin(false); // Close modal after OTP is sent
                    navigate('/reset-password');
                }, 2000); // Adjust timing if needed
            } else {
                setUserMessage({ text: response.data.message || 'Unable to send OTP. Please try again.', type: 'error' });
            }
        } catch (error) {
            setOtpLoading(false); // Reset OTP loading state
            setUserMessage({ text: 'Error occurred while requesting OTP.', type: 'error' });
            console.error('Forgot password error:', error.response ? error.response.data : error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    // Function to handle privacy policy link click
    const handlePrivacyPolicyClick = () => {
        setShowLogin(false); // Close the modal
        navigate('/privacy-policy'); // Navigate to the privacy policy page
    };

    return (
        <div className="loginsignup">
            <form onSubmit={onSubmitHandler} className="loginsignup-container">
                <div className='title'>
                    <h1>{currState}</h1>
                    <RxCross1 onClick={() => setShowLogin(false)} className="close-icon" />
                </div>

                <div className="loginsignup-fields">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={onChangeHandler}
                            required
                        />
                        <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>

                <button className="logsign-button" type="submit" disabled={loading}>
                    {loading ? <div className="loading-indicator"></div> : currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                <div className="popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the <span className='terms' onClick={handlePrivacyPolicyClick}>terms of use & privacy policy</span></p>
                </div>

                {currState === "Login" ? (
                    <>
                        <p className="loginsignup-login">
                            Forgot password? <span className="clickable" onClick={onForgotPassword}>
                                {otpLoading ? <div className="loading-indicator"></div> : 'Reset'}
                            </span>
                        </p>
                        <p className="loginsignup-login">
                            Create a new account? <span className="clickable" onClick={() => setCurrState("Sign Up")}>Sign Up</span>
                        </p>
                    </>
                ) : (
                    <p className="loginsignup-login">
                        Already have an account? <span className="clickable" onClick={() => setCurrState("Login")}>Login</span>
                    </p>
                )}

                {userMessage && <div className={`user-message ${userMessage.type}`}>{userMessage.text}</div>}
            </form>
        </div>
    );
};
