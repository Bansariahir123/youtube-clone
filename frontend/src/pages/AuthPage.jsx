// src/pages/AuthPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import "./AuthPage.css";
const AuthPage = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [isRegistering, setIsRegistering] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [channelId, setChannelId] = useState(null);

    useEffect(() => {
        // Check if the user is already authenticated
        const token = localStorage.getItem("token");
        const storedChannelId = localStorage.getItem("channelId");
        if (token && storedChannelId) {
            setIsAuthenticated(true);
            setChannelId(storedChannelId);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";

        try {
            const response = await axios.post(`http://localhost:5000${endpoint}`, form);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("channelId", response.data.channelId);
                localStorage.setItem("username", form.username || response.data.username);
                setIsAuthenticated(true);
                setChannelId(response.data.channelId);

                alert("Authentication successful!");
                window.location.href = "/";
            } else {
                alert(response.data.message || "Successfully registered");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            alert(error.response?.data?.message || "Authentication failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("channelId");
        setIsAuthenticated(false);
        setChannelId(null);
        setForm({ username: "", email: "", password: "" });
        setIsRegistering(true);
    };

    return (
        <div className="auth-page">
            <div className="auth-form-box">
            <h2>{isAuthenticated ? "Welcome!" : isRegistering ? "Register" : "Login"}</h2>

            {!isAuthenticated ? (
                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button type="submit">{isRegistering ? "Register" : "Login"}</button>
                </form>
            ) : (
                <>
                    <button onClick={() => (window.location.href = `/profile/${localStorage.getItem("userId")}`)}>
                        View Profile
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
            {!isAuthenticated && (
                <button onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Switch to Login" : "Switch to Register"}
                </button>
            )}
            </div>
        </div>
        
    );
};

export default AuthPage;

