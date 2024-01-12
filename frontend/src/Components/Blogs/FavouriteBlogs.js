import React, { useEffect,useState } from 'react'
import Card from './Card'
import "./blogs.css"
import { PiSmileySadLight } from 'react-icons/pi'
import { getFavBlogs } from '../../Api/userApi'
import {toast} from "react-toastify"
import { useDispatch } from 'react-redux'
import { setLoader } from '../../State/Slice/loaderSlice'



const FavouriteBlogs = () => {
    const [blogs,setBlogs]=useState([]);
    const dispatch=useDispatch();

    useEffect(() => {
        const getBlogs = async () => {
          dispatch(setLoader(true));

          const res = await getFavBlogs();

          if (res.success) {
            console.log("",res.favblogs.favourite)
            setBlogs(res.favblogs.favourite);   
          }
          else {
            console.log("Error", res.error);
            toast.error(res.error);
          }
          dispatch(setLoader(false));
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