import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome to Our Coworking Space</h1>
            <p>Your space for productivity and collaboration.</p>
            <div style={{ marginTop: "20px" }}>
                <Link to="/signup" style={linkStyle}>
                    <button style={buttonStyle}>Sign Up</button>
                </Link>
                <Link to="/signin" style={linkStyle}>
                    <button style={buttonStyle}>Sign In</button>
                </Link>
            </div>
        </div>
    );
};

const linkStyle = {
    textDecoration: "none",
    margin: "0 10px"
};

const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "5px",
    outline: "none"
};

export default Home;
