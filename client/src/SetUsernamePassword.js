import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SetUsernamePassword = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/setusernamepassword", {
                username,
                password,
                email,
            });
            if (response.data) {
                navigate("/signin");
            }
        } catch (error) {
            console.error("Error setting username and password", error);
        }
    };

    return (
        <div>
            <h2>Set Username and Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Set Username and Password</button>
            </form>
        </div>
    );
};

export default SetUsernamePassword;
