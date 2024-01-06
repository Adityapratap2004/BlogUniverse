import React, {useState,useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import logo from "../../Images/logo.png"
import User from './User'

import './navbar.css'

const Navbar = () => {
    const [border,setBorder]=useState(false);
    const location=useLocation();
    const { pathname } = location;
    
    useEffect(()=>{
        const showBorder=()=>{
            if(window.scrollY>90){
                setBorder(true);                
            }
            else{
                setBorder(false);
            }
        }
        window.addEventListener('scroll',showBorder);
       
        if(location.hash){ 
             const elem=document.getElementById(location.hash.slice(1));
            if(elem){    
                elem.style.scrollMarginTop = "70px"
                elem.scrollIntoView({behavior:"smooth"});
                elem.style.scrollMarginTop = "0";          
                window.history.pushState({}, document.title, pathname);
            }
        }
        else{
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return ()=>{
            window.removeEventListener('scroll',showBorder);
        }

    },[location]);    
    
    return (
        <div className={!border ? "nav":"nav active"}>
            <div className='logo'>
                <Link to="/">
                <img src={logo} alt="logo" width="150px" height="40px" />
                </Link>
            </div>
            <div className='navpages'>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/#blogs" >blog</Link></li>
                    <li><Link to="/#aboutus">About Us</Link></li>                  
                    <li><Link to="/#contactus">Contact Us</Link></li>
                </ul>
            </div>
            <div>
                <User />
            </div>

        </div>
    )
}

export default Navbar
