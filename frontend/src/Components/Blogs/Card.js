import React, { useState } from 'react'
import { AiOutlineTags, AiOutlineShareAlt } from "react-icons/ai"
import { BiTimeFive } from "react-icons/bi"
import { FaRegComments } from "react-icons/fa"
import { GrFavorite } from "react-icons/gr"
import { Link } from 'react-router-dom'
import { addFavourite } from '../../Api/userApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../../State/Slice/userSlice'
import { toast } from "react-toastify"
import 'react-tooltip/dist/react-tooltip.css'


const Card = ({ blog }) => {

  const dispatch = useDispatch();

  const [copy, copied] = useState("copy link")

  const addToFavourite = async (id) => {
    if (localStorage.getItem('authToken')) {
      //call the api 
      const res = await addFavourite(id);
      if (res.success) {
        //set user
        console.log("Blog has been added successfully");
        toast.success("Blog has been added successfully");
        dispatch(setUser(res.updatedUser));
      }
      else {
        console.log(res.error);
        toast.error(res.error);
      }
    }
    else {
      console.log("You need to be logged to add blog to favourite");
      toast.error("You need to be logged to add blog to favourite");
    }

  }

  // console.log(blog);
  console.log(blog.comments.length);
  const blogdate = new Date(blog.date);



  return (
    <div className='card'>
      <Link to={`/details/${blog._id}`}>
        <div>
          {<img src={blog.blogImg.imageUrl} alt="artilcePhoto" />}
        </div>
        <div className='details'>
          <div className='tag'>
            <AiOutlineTags className="icon" />
            <p>#{blog.category.category}</p>
          </div>
          <Link to={`/details/${blog._id}`}>
            <div className='content'>
              <h3>{blog.title}</h3>
              <p >{(blog.content).slice(0, 200)}...</p>
            </div>
          </Link>

          <div className='date'>

            <span  ><BiTimeFive className="icon" /><p>{(blogdate).toDateString()}</p></span>
            <span data-tooltip-id="my-tooltip" data-tooltip-content="comments" ><FaRegComments className="icon" /><p>{blog.comments.length}</p></span>
            <span data-tooltip-id="my-tooltip" data-tooltip-content={copy} place="right"
             onClick={(e) => {
                 navigator.clipboard.writeText(`${window.location.href}details/${blog._id}`); 
                 e.preventDefault();
                 copied("Link is copied")
                 setTimeout(()=>{
                  copied("copy");
                 },2000);
                 
               }} >
               <AiOutlineShareAlt className="icon" />
               <p>share</p>
            </span>
            <span data-tooltip-id="my-tooltip" data-tooltip-content="add to favourite" onClick={(e) => { addToFavourite(blog._id); e.preventDefault() }}><GrFavorite className='icon' /><p>favorite</p></span>
          </div>

        </div>
      </Link>
    </div>
  )
}

export default Card
