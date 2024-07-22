import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmailConfirmation = () => {
    const { token } = useParams();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/confirm", { token, email });
            setMessage(response.data.message);
        } catch (err) {
            setMessage("Error confirming email");
        }
    };

    return (
        <div>
            <h1>Email Confirmation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Confirm Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailConfirmation;
