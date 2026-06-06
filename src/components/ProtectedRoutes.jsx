// ProtectedRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const { authToken } = useSelector((state) => state.auth);

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoutes;