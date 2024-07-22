import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmail = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('Confirming email...');

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/confirm/${token}`);
                setMessage(response.data);
            } catch (error) {
                setMessage('Error confirming email.');
            }
        };

        confirmEmail();
    }, [token]);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default ConfirmEmail;
