import React, { useState } from 'react'
import './signup.css'
import loginImg from "../../Images/loginpage.jpg"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from '../../State/Slice/authSlice';
import { signup } from '../../Api/AuthApi';
import { setUser } from '../../State/Slice/userSlice';
import {  toast } from 'react-toastify';


const Signup = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [cridentials, setCridetnials] = useState({ username: "", email: "", password: "" });
  const handleChange = (e) => {
    setCridetnials({ ...cridentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(cridentials);
    if (res.success) {
      console.log("Logged in successfully");
      toast.success("Logged in successfully" );
      dispatch(setLogin({show:true,msg:"Signed up successfully"}))
      localStorage.setItem('authToken','true')
      dispatch(setLogin({authtoken:'true',creater_id:res?.user?.creater_id}));
      dispatch(setUser(res.user));
      nav("/");
    }
    else {
      console.log("Error", res.error);
      toast.error(res.error);
    }
  }
  
  return (
    <div className='signup'>
    
      <div className='signupdetails'>
        <div>
          <h1>Singup</h1>
          <form onSubmit={handleSubmit} id="form">
            <label htmlFor='username'> User Name *</label>
            <input id="htmlFor" type="text" name="username" value={cridentials.username} required onChange={handleChange}></input>
            <label htmlFor='email' >Email *</label>
            <input id="email" type="email" name='email' value={cridentials.value} required onChange={handleChange} ></input>
            <label htmlFor='password' required>Password *</label>
            <input id="password" name="password" value={cridentials.password} required onChange={handleChange}></input>
          </form>
          <button form="form">
            Signup
          </button>
          <p>Have an account<Link to="/login"> Login. </Link></p>

        </div>
        <img src={loginImg} alt="loginImg" />
      </div>

    </div>

  )
}

export default Signup