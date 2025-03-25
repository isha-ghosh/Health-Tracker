import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//http://localhost:5057/api/Users/login/{Email}/{PasswordHash}

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5057/api/Auth/login', { 
                Email: email,
                PasswordHash: password
            });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setMessage('Login successful!');
          
          //alert("Result is " +response)
            // Redirect to Menu page
            navigate('/user-profile');
            
        } catch (error) {
            setMessage('Invalid username or password');
        }
        // try {
        //     const response = await axios.get(`http://localhost:5057/api/Users/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
        //     console.log("Login API Response:", response.data);
        //     if (response.status === 200 && response.data) {
        //         // Assuming API response contains token or user details
        //         localStorage.setItem('user', JSON.stringify(response.data)); // Store user details
        //         localStorage.setItem('token', response.data.token || 'dummyToken'); 
        //         //console.log("User Data Saved in Local Storage:", localStorage.getItem('user')); 
        //         setMessage('Login successful!');
                
        //         // Redirect to Admin page
        //        // navigate("/admin")
        //         navigate('/user-profile');
        //     } else {
        //         setMessage('Invalid email or password');
        //     }
        // } catch (error) {
        //     console.error("Login Error:", error);
        //     setMessage('Invalid email or password');
        // }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient bg-light">
          <div className="card shadow-lg p-4 rounded-4" style={{ width: '350px' }}>
            <h2 className="text-center mb-4 text-primary fw-bold">User Login</h2>
            
            {message && (
              <div className="alert alert-danger text-center py-2">
                {message}
              </div>
            )}
      
            <div className="mb-3">
              <input
                type="email"
                className="form-control shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
      
            <div className="mb-3">
              <input
                type="password"
                className="form-control shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
      
            <button className="btn btn-primary w-100 mb-3 fw-semibold" onClick={handleLogin}>
              Login
            </button>
      
            <div className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none fw-semibold">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      );
      
};

export default UserLogin;


