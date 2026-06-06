import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import dashboard from "../components/Dashboard"
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import "./Signup.css";

const Signup = () => {
    const { authToken, status } = useSelector((state) => state.auth) || {}

    const [data, SetData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        SetData({
            ...data, [name]: value
        })
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://192.168.1.128/todo/index.php/api/register",
                data
            );
            console.log(res, "res here");
            if (res.data.status) {


                dispatch({
                    type: 'auth/signup',
                    payload: {
                        authToken: res.data.token,
                        status: res.data.status
                    }
                })

                setData({
                    name: "",
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
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Join us and start managing your todos</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="signup-btn">
                        Create Account
                    </button>
                </form>
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}


                <div className="login-section">
                    <p>Already have an account?</p>

                    <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;