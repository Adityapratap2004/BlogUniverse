import React from 'react'
import "./footer.css"
import { BsLinkedin, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (

        <div className='footer'>
            <div className='cont'>
                <div className='link'>
                    <Link to="https://www.linkedin.com/in/aditya-pratap-singh-971b25229/"><BsLinkedin /></Link>
                    <Link to="https://www.instagram.com/adityapratap_singh444/"><BsInstagram /></Link>
                    <Link to="https://twitter.com/adityap93397538"><BsTwitter /></Link>
                    <Link to="https://github.com/Adityapratap2004"><BsGithub /></Link>
                </div>
                <div>
                    <p>Made by Aditya Pratap Singh ©Blog Universe</p>
                </div>
            </div>
        </div>
    )
}

export default Footer