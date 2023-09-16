import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });
   
  const [userData, setUserData] = useState(null); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        userData.email = formData.email; // Include email in userData
userData.password = formData.password; // Include password in userData
userData.id = formData.id; // Include email in userData




        if (userData.is_active) {
          // Successful login, store user data and redirect to the home page
          console.log('Login successful');
          localStorage.setItem('userData', JSON.stringify(userData));
          setUserData(userData); // Store user data in the state
          // Redirect to the home page or perform other actions
          window.location.href = 'http://localhost:3000/';
        } else {
          // Handle the case when the account is not active
          console.error('Account is inactive');
          setEmailError('Account is inactive');
        }
      } else {
        // Handle other login errors (e.g., user not found, incorrect password)
        const errorData = await response.json();
        if (errorData.error === 'user_not_found') {
          setEmailError('User not registered.');
        } else if (errorData.error === 'incorrect_password') {
          setPasswordError('Incorrect password.');
        } else {
          console.error('Login failed:', errorData.error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white rounded-3">
                <div className="card-body p-5 text-center">
                  <h2 className="fw-bold mb-4 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-4">Please enter your login and password.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className={`form-control form-control-lg ${emailError && 'is-invalid'}`}
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className={`form-control form-control-lg ${passwordError && 'is-invalid'}`}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                    </div>

                    <button className="btn btn-light btn-lg px-5" type="submit">
                      Login
                    </button>
                  </form>

                  <p className="small mt-4">
                    Don't have an account?{' '}
                    <a href="http://localhost:3000/registration" className="text-white fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
