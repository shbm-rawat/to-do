import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import dashboard from "./Dashboard"
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import "./Login.css";


const Login = () => {

    const authToken = useSelector((state) => state.auth) || {}
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://192.168.1.128/todo/index.php/api/login",
                form
            );

            if (res.data.status) {
                dispatch({
                    type: 'auth/login',
                    payload: { authToken: res.data.token, name: res.data.name }
                })
                Cookies.set("token", res.data.token);
                Cookies.set("name", res.data.name);

                setForm({
                    email: "",
                    password: "",
                });
                navigate('/');
            } else {
                setErrorMessage(res.data.message)
            }
        } catch (error) {
            console.error("Login failed:", error);
        }

    };



    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Login to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <div className="signup-section">
                    <p>Don't have an account?</p>
                    <button
                        className="signup-btn"
                        onClick={() => navigate("/signup")}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;