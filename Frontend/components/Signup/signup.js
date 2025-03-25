import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate(); 
    const [user, setUser] = useState({
        FullName: '',
        Email: '',
        PasswordHash: '',
        CreatedAt: new Date().toISOString().slice(0, 16), // Correct datetime format
        Gender: '',
        Height: '',
        Weight: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5057/api/Users', user)
            .then(response => {
                setMessage('User added successfully!');
                 // Redirect to Login page after 2 seconds
                 setTimeout(() => {
                    navigate('/');  // Navigate to the login page
                }, 1000);
                  // Clear form
                setUser({
                    FullName: '',
                    Email: '',
                    PasswordHash: '',
                    CreatedAt: new Date().toISOString().slice(0, 16),
                    Gender: '',
                    Height: '',
                    Weight: ''
                });
            })
            .catch(error => {
                setMessage('Error adding user');
            });
    };

   
    return (
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card shadow-lg p-4 rounded-4" style={{ width: '100%', maxWidth: '500px' }}>
            <h3 className="mb-4 text-center text-primary">Add User</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control shadow-sm rounded-3"
                  name="FullName"
                  value={user.FullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
      
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control shadow-sm rounded-3"
                  name="Email"
                  value={user.Email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
      
              <div className="mb-3">
                <select
                  className="form-select shadow-sm rounded-3"
                  name="Gender"
                  value={user.Gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
      
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control shadow-sm rounded-3"
                  name="PasswordHash"
                  value={user.PasswordHash}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
      
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control shadow-sm rounded-3"
                  name="Height"
                  value={user.Height}
                  onChange={handleChange}
                  placeholder="Height (in ft)"
                  required
                />
              </div>
      
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control shadow-sm rounded-3"
                  name="Weight"
                  value={user.Weight}
                  onChange={handleChange}
                  placeholder="Weight (in kg)"
                  required
                />
              </div>
      
              <div className="mb-4">
                <label className="form-label fw-semibold">Created At</label>
                <input
                  type="datetime-local"
                  className="form-control shadow-sm rounded-3"
                  name="CreatedAt"
                  value={user.CreatedAt}
                  onChange={handleChange}
                  required
                />
              </div>
      
              <button type="submit" className="btn btn-primary w-100 rounded-3">
                Add User
              </button>
      
              <div className="text-center mt-3">
                Already have an account? 
                <Link to="/" className="text-decoration-none fw-semibold"> Login </Link>
              </div>
            </form>
      
            {message && <p className="text-center mt-3 text-success fw-semibold">{message}</p>}
          </div>
        </div>
      );
      
};

export default SignUp;
