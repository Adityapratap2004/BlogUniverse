import React, { useEffect,useState } from 'react'
import Card from './Card'
import "./blogs.css"
import { PiSmileySadLight } from 'react-icons/pi'
import { getFavBlogs } from '../../Api/userApi'
import {toast} from "react-toastify"



const FavouriteBlogs = () => {
    const [blogs,setBlogs]=useState([]);

    useEffect(() => {
        const getBlogs = async () => {
          const res = await getFavBlogs();
          if (res.success) {
            console.log("",res.favblogs.favourite)
            setBlogs(res.favblogs.favourite);   
          }
          else {
            console.log("Error", res.error);
            toast.error(res.error);
          }
        }
        getBlogs();
      },[])
      
  return (
    <>
    <h1 className='favblogheading'>Favourtie Blogs</h1>
    {blogs.length === 0 ? <div className='noblogs'><p>No blogs are there</p> <PiSmileySadLight /></div> : <div className='blog'>
      {
        blogs.map((blog) => {
          return <Card key={blog._id} blog={blog} />
        })
      }
    </div>
    }
  </>
  )
}

export default FavouriteBlogs