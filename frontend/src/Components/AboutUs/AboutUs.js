import React from 'react'
import './aboutus.css'

import img from "../../Images/aboutus.jpg"

const AboutUs = () => {
    return (
        <div className='imgsection' id="aboutus">
            <img src={img} className='imgn' alt="bgimg"></img>
            <div className='aboutus'>
                <h1>About Us !</h1>
                <p>
                Welcome to BLOG UNIVERSE! We're a dedicated team on a mission to provide a space for creators like you to share your stories and insights.</p> 
                <p>Our platform is all about empowerment and collaboration. Whether you're a seasoned blogger or new to the scene, we welcome you to join us. Share your thoughts, experiences, and expertise with our global community.</p>
                <p> Together, we can inspire, inform, and spark meaningful conversations. We believe in the power of your voice, and we're excited to be part of your blogging journey. Join us, start sharing, and let's make great content together.

                </p>

            </div>

        </div>


    )
}

export default AboutUs