import React from 'react'
import "./contactus.css"
import img from "../../Images/contactus.webp"

const Contactus = () => {
    return (
        <div className='contactus' id="contactus">
            <img src={img} alt="contact us" />
            <form className='contactusForm'>
                <h1>Drop us a line</h1>
                <label htmlFor="name">Full Name</label>
                <input  id="name" placeholder="What's your full name?" type="text"></input>
                <label htmlFor="email" >Email Address</label>
                <input id="email" placeholder='you@example.com' type="email"></input>
                <label htmlFor="message">Message</label>
                <textarea id="message"  placeholder='Write your message for the team here'></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Contactus