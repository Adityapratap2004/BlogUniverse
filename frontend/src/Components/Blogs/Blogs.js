import React, { useEffect,useState } from 'react'
import Card from './Card'
import "./blogs.css"
import { getblogs } from '../../Api/BlogsApi'
import { useDispatch, useSelector } from "react-redux"
import { setBlogs } from '../../State/Slice/blogsSlice'
import { PiSmileySadLight } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'
import {toast} from "react-toastify"

export const Blogs = () => {
  const blogs = useSelector(state => state.Blogs);
  const dispatch = useDispatch();
  const location=useLocation();

  const [hash, setHash] = useState(window.location.hash.slice(1));

  console.log("hash",hash);

  

  const lengthOfBlogSpecificCat=()=>{
    if(hash==='blogs' || hash==='contactus' || hash==='aboutus'){
      return 1;
    }
    if(hash===''){
      return 1;
    }
    let c=0;
    for(let i=0;i<blogs.length;i++){
      if(blogs[i].category.category===hash){
        c++;
      }
    }
    return c;
  }
    
  
  
  useEffect(() => {
       
    setHash(location.hash.slice(1));

    const getBlogs = async () => {
      const res = await getblogs();
      if (res.success) {
        console.log(res.blogs)
        dispatch(setBlogs(res.blogs));
              
      }
      else {
        console.log("Error", res.error);
        toast.error(res.error );
      }
    }
    getBlogs();
  },[location.hash])
  
  return (
    <div id="blogs">
      {blogs.length === 0 ? <div className='noblogs' ><p>No blogs are there</p> <PiSmileySadLight /></div> : 
      lengthOfBlogSpecificCat()===0?<div className='noblogs' ><p>No blogs are there of this category</p> <PiSmileySadLight /></div>:<div className='blog'>
        {
          blogs.map((blog) => {
            if(blog.category.category===hash || hash==="" || hash==='blogs' || hash==='contactus' || hash==='aboutus'){
              return <Card key={blog._id} blog={blog} />
            }
            return null;
            
          })
        }
      </div>
      }
    </div>
  )
}
