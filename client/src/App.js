import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './SignUp';
import SetUsernamePassword from './SetUsernamePassword';
import Signin from './SignIn';
import ConfirmEmail from './ConfirmEmail';
import Home from './Home';
import Dashboard from './Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/setusernamepassword" element={<SetUsernamePassword />} />
                <Route path="/confirm/:token" element={<ConfirmEmail />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
