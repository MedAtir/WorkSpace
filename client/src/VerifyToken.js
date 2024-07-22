import React, { useState } from 'react';
import axios from 'axios';

const VerifyToken = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/verify-token', { email, token });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Verify Your Email</h2>
            <form onSubmit={handleVerify}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Token:</label>
                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Verify</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyToken;
