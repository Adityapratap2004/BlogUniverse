import React, { useState } from 'react'
import "./login.css"
import loginImg from "../../Images/loginpage.jpg"
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../Api/AuthApi';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../State/Slice/authSlice';
import { setUser } from '../../State/Slice/userSlice';
import {toast} from "react-toastify"



const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [cridentials, setCridetnials] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setCridetnials({ ...cridentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(cridentials);
    if (res.success) {
     
      console.log("Logged in successfully");
      toast.success("Logged in successfully" );
      //loggef in hai to isko store kar local storage mai as a boolean value
      //user ko bhi

      localStorage.setItem('authToken', true);
      localStorage.setItem('creater_id', res?.user?.creater_id);
      localStorage.setItem('user', JSON.stringify(res?.user));

      dispatch(setLogin({ authtoken: 'true', creater_id: res?.user?.creater_id }));
      dispatch(setUser(res.user))
      nav("/");
    }
    else {
      console.log("Error", res.error);
      toast.error(res.error );
      
      
    }
  }
  console.log(cridentials)
  return (
    <div className='login'>
      <div className='logindetails'>
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} id="loginform">
            <label htmlFor='email'>Email *</label>
            <input id="email" type="email" name="email" value={cridentials.email} onChange={handleChange} required></input>
            <label htmlFor='password' required>Password *</label>
            <input id="password" type="password" name="password" onChange={handleChange} required value={cridentials.password}></input>
          </form>
          <button form='loginform'>
            Login
          </button>
          <p>Don't have an account!<Link to="/signup"> Create your account </Link>it takes less than a minute.</p>

        </div>
        <img src={loginImg} alt="" />
      </div>

    </div>
  )
}

export default Login
