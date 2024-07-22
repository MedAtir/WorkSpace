import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        foundUs: "",
        jobTitle: "",
        company: "",
        domain: "",
        linkedin: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/signup", formData);
            if (response.data) {
                navigate("/setusernamepassword", { state: { email: formData.email } });
            }
        } catch (error) {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                <input type="text" name="foundUs" placeholder="How did you find us?" value={formData.foundUs} onChange={handleChange} />
                <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
                <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
                <input type="text" name="domain" placeholder="Domain" value={formData.domain} onChange={handleChange} />
                <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;
