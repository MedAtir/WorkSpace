import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:4000/signin', { email, password });
            if (response.data.success) {
                navigate('/home'); // Navigate to the home page
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignIn;
