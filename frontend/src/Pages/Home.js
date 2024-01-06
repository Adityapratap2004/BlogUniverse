import React from 'react'
import Category from '../Components/Category/Category'
import { Blogs } from '../Components/Blogs/Blogs'
import Cookies from "js-cookie"
import Contactus from '../Components/ContactUs/Contactus'
import AboutUs from '../Components/AboutUs/AboutUs'



const Home = () => {   
    console.log(Cookies.get('authToken'))
    
    return (
        <>
           <Category />
           <Blogs/>
           <AboutUs/>
           <Contactus/>
        </>
    )
}

export default Home
