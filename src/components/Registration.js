import React, { useState } from 'react';
// import Adminmodal from './Adminmodal';
import axios from 'axios'


export default function RegistrationForm() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
//   const [showFlag,setShowFlag] = useState(false);

//   const handleShow = (item) =>{
//     console.log(item);

//     setShowFlag(true);
// }


// const handleclose = () =>{
//     setShowFlag(false);
// }
 
  const handleSubmit = async (e) => {
      e.preventDefault();


   
      axios.post('http://localhost:3001/register',formData)
      .then(res=>{
          console.log(res);
          window.location.href = 'http://localhost:3000/';
      })
      .catch(err=>{
        console.log(err);
      })

      // const response = await fetch('http://localhost:3001/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const userData = await response.json();
      // if (response.ok && userData.is_active === true) {
      //   // Registration successful, you can handle success here
      //   console.log('Registration successful');
      //   window.location.href = 'http://localhost:3000/';
      
      // }
      // else {
        
      //   console.error('Inactive account');
      //   {formData.is_active === false && <Adminmodal showFlag={showFlag} handleclose={handleclose} />}



        
      // }
    }
  
 

  //  class selector STYLE -------------
  const containerStyle = {
    backgroundColor: '#eee',
  };

  return (
    <section className="vh-100" style={containerStyle}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">Username</label>
                              <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email</label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                              <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="role" className="form-label">Role</label>
                              {/* <input
                                type="text"
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="form-control"
                                required
                              /> */}
                              <select className="form-control" value={formData.role} onChange={handleChange}>
                                  <option value='student'>student</option>
                                  <option value='adminstration'>adminstration</option>
                              </select>
                              
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Register</button>
                            
                      </form>
{/* {formData.is_active === false && <div><Adminmodal showFlag={showFlag} handleclose={handleclose}/></div>

} */}


                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
