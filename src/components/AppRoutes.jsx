import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import LoginPage from "../components/Login";
import Signup from "../components/SignUp";
import CreateTodo from './CreateTodo';
import { useSelector } from 'react-redux';
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from './PublicRoute';



const AppRoutes = () => {

    const { authToken } = useSelector((state) => state.auth);


    return (
        <Routes>
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

            <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
            <Route path="/createUser" element={<ProtectedRoutes><CreateTodo /></ProtectedRoutes>} />
        </Routes>
    );
}



export default AppRoutes